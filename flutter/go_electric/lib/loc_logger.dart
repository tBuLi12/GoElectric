import 'package:geolocator/geolocator.dart';

class LocLogger {
  final GeolocatorPlatform geolocator = GeolocatorPlatform.instance;
  final List<Position> posLog = [];
  Future<bool> checkPermissions() async {
    var enabled = await geolocator.isLocationServiceEnabled();
    var permission = await geolocator.checkPermission();
    return (enabled && permission == LocationPermission.always ||
        permission == LocationPermission.whileInUse);
  }

  void log() async {
    if (await checkPermissions()) {
      posLog.add(await geolocator.getCurrentPosition());
    }
  }
}
