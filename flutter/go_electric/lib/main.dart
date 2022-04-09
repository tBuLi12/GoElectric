import 'dart:async';
import 'dart:io' show Platform;

import 'package:flutter/material.dart';
import 'package:flutter_background_service/flutter_background_service.dart';
import 'package:flutter_background_service_android/flutter_background_service_android.dart';
import 'package:flutter_background_service_ios/flutter_background_service_ios.dart';
import 'package:geolocator/geolocator.dart';
import 'package:go_electric/loc_logger.dart';
import 'package:url_launcher/url_launcher.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initializeService();
  runApp(const MyApp());
}

Future<void> initializeService() async {
  final service = FlutterBackgroundService();
  await service.configure(
    androidConfiguration: AndroidConfiguration(
      onStart: onStart,
      autoStart: true,
      isForegroundMode: true,
    ),
    iosConfiguration: IosConfiguration(
      autoStart: false,
      onForeground: onStart,
      onBackground: onIosBackground,
    ),
  );
}

void onIosBackground() {}

class Location {
  final double latitude, longitude;
  Location(this.latitude, this.longitude);
  String toJson() {
    return '{"latitude":$latitude, "longitude":$longitude}';
  }
}

class PosCounter {
  int count = 1;
  Location pos;
  PosCounter(this.pos);
  bool push(Location newPos) {
    if (Geolocator.distanceBetween(
            pos.latitude, pos.longitude, newPos.latitude, newPos.longitude) <
        3) {
      ++count;
      return true;
    } else {
      return false;
    }
  }
}

const locCount = 5;
List<Location> processData(List<Location> data) {
  List<PosCounter> buckets = [];
  for (var pos in data) {
    bool inserted = false;
    for (var bucket in buckets) {
      if (inserted = bucket.push(pos)) break;
    }
    if (!inserted) {
      buckets.add(PosCounter(pos));
    }
  }
  buckets.sort((a, b) => b.count - a.count);
  return buckets
      .where((posCnt) => posCnt.count > 0.05 * locCount)
      .map((e) => e.pos)
      .toList();
}

Future<void> goToWebpage(List<Location> data) async {
  var frequentLocs = processData(data);
  var success = await launch(Uri(
      scheme: 'http',
      host: '192.168.137.203',
      port: 3000,
      path: '/',
      queryParameters: {
        'locs': frequentLocs.map<String>((e) => e.toJson()).toList()
      }).toString());
  if (!success) {
    print('well fuck');
  }
}

void onStart() {
  WidgetsFlutterBinding.ensureInitialized();
  if (Platform.isIOS) FlutterBackgroundServiceIOS.registerWith();
  if (Platform.isAndroid) FlutterBackgroundServiceAndroid.registerWith();

  final service = FlutterBackgroundService();
  service.setNotificationInfo(
    title: "My App Service",
    content: "Updated at ${DateTime.now()}",
  );

  var logger = LocLogger();
  double calcProgress(int len) {
    return (len / locCount).toDouble();
  }

  service.onDataReceived.listen((event) {
    if (event!["action"] == "getProgress") {
      service.sendData({'progress': calcProgress(logger.posLog.length)});
    } else if (event["action"] == "stopService") {
      service.stopService();
    }
  });
  service.setAsForegroundService();
  Timer.periodic(const Duration(seconds: 2), (timer) async {
    if (!(await service.isRunning())) timer.cancel();
    logger.log();
    var progress = calcProgress(logger.posLog.length);
    if (progress >= 1) {
      print(logger.posLog
          .map((e) => {'longitude': e.longitude, 'latitude': e.latitude})
          .toList());
      service.sendData({
        'done': logger.posLog
            .map((e) => {'longitude': e.longitude, 'latitude': e.latitude})
            .toList()
      });
      service.stopService();
    } else {
      service.sendData({'progress': progress});
    }
  });
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> with WidgetsBindingObserver {
  LocationPermission? permission;
  bool loading = true;
  bool? running;
  double? progress;
  List<Location>? posList;
  @override
  Widget build(BuildContext context) {
    final service = FlutterBackgroundService();
    final List<Widget> view = posList != null
        ? [
            const Text('Done collecting data!'),
            ElevatedButton.icon(
                onPressed: () => goToWebpage(posList!),
                icon: const Icon(Icons.web),
                label: const Text('go to webside'))
          ]
        : loading
            ? const [
                CircularProgressIndicator(),
                Text('Loading permissions...')
              ]
            : permission == null || running == null
                ? const [Text('please enable location')]
                : permission == LocationPermission.always
                    ? running!
                        ? [
                            const Text('tracking, you may close the app'),
                            ElevatedButton(
                                onPressed: () {
                                  service.sendData({'action': 'stopService'});
                                  setState(() {
                                    running = false;
                                    progress = 0;
                                  });
                                },
                                child: const Text('stop')),
                            progress == null
                                ? const Text('loading progress...')
                                : LinearProgressIndicator(
                                    value: progress,
                                  )
                          ]
                        : [
                            ElevatedButton(
                                onPressed: () {
                                  service.startService();
                                  setState(() => running = true);
                                },
                                child: const Text('start tracking!'))
                          ]
                    : [
                        const Text(
                            'please grant the app location permission - always'),
                        ElevatedButton(
                            onPressed: () =>
                                GeolocatorPlatform.instance.openAppSettings(),
                            child: const Text('settings'))
                      ];
    return MaterialApp(
        home: Scaffold(
            appBar: AppBar(
              title: const Text('GoElectric App'),
            ),
            body: Center(
              child: Column(
                children: view,
                mainAxisAlignment: MainAxisAlignment.center,
              ),
            )),
        theme: ThemeData(
            colorScheme: const ColorScheme.light()
                .copyWith(primary: const Color.fromRGBO(102, 218, 191, 1))));
  }

  @override
  void initState() {
    WidgetsBinding.instance!.addObserver(this);
    checkPermissions();
    FlutterBackgroundService()
      ..isRunning().then((r) => setState(() => running = r))
      ..onDataReceived.listen((event) {
        double? prog = event!['progress']?.toDouble();
        if (prog != null) {
          setState(() => progress = prog);
          return;
        }
        var data = event['done'];
        if (data != null) {
          setState(() => posList = data
              .map<Location>((e) => Location(e['latitude'], e['longitude']))
              .toList());
        }
      })
      ..sendData({'action': 'getProgress'});
    super.initState();
  }

  @override
  void dispose() {
    WidgetsBinding.instance!.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) checkPermissions();
    super.didChangeAppLifecycleState(state);
  }

  void checkPermissions() async {
    setState(() => loading = true);
    var geolocator = GeolocatorPlatform.instance;
    permission = (await geolocator.isLocationServiceEnabled())
        ? (await geolocator.checkPermission())
        : null;
    loading = false;
    setState(() {});
  }
}
