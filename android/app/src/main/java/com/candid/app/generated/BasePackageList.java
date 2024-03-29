package com.candid.app.generated;

import java.util.Arrays;
import java.util.List;
import org.unimodules.core.interfaces.Package;

public class BasePackageList {
  public List<Package> getPackageList() {
    return Arrays.<Package>asList(
        new expo.modules.analytics.amplitude.AmplitudePackage(),
        new expo.modules.application.ApplicationPackage(),
        new expo.modules.constants.ConstantsPackage(),
        new expo.modules.contacts.ContactsPackage(),
        new expo.modules.device.DevicePackage(),
        new expo.modules.errorrecovery.ErrorRecoveryPackage(),
        new expo.modules.filesystem.FileSystemPackage(),
        new expo.modules.firebase.core.FirebaseCorePackage(),
        new expo.modules.font.FontLoaderPackage(),
        new expo.modules.imageloader.ImageLoaderPackage(),
        new expo.modules.imagemanipulator.ImageManipulatorPackage(),
        new expo.modules.medialibrary.MediaLibraryPackage(),
        new expo.modules.permissions.PermissionsPackage(),
        new expo.modules.imagepicker.ImagePickerPackage(),
        new expo.modules.keepawake.KeepAwakePackage(),
        new expo.modules.notifications.NotificationsPackage(),
        new expo.modules.screenorientation.ScreenOrientationPackage(),
        new expo.modules.splashscreen.SplashScreenPackage(),
        new expo.modules.updates.UpdatesPackage(),
        new expo.modules.webbrowser.WebBrowserPackage()
    );
  }
}
