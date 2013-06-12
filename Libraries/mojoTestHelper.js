var mojoTestHelper = function () {
  var helper = {
    SetupController: function (element, controllerName) {
      var controller = mojo.controllers[controllerName];
      var abstractController = new mojo.Controller()
      , controller = jQuery().extend(controller, controller.methods)
      , controller = jQuery().extend(controller, abstractController);

      controller.initialize(element, controllerName);
      mojo.controllers[controllerName] = controller;

      return mojo.controllers[controllerName];
    }
  }

  return helper;
}

window.MojoTestHelper = mojoTestHelper;