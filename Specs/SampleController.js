mojo.define('SampleController', function () {
  var Controller = {
    events: [
    ],
    methods: {
      Initialize: function () {
        //console.log(this);
        this.getContextElement();
      },
      GetSelf: function () {
        return this;
      },
      DoSomeXhr: function () {
        var self = this;
        ServiceLocator.getService("getSomething").invoke({}, function (err, res) {
          if (res.Success) {
            jQuery(self.getContextElement()).html('hi');
          } else {
            jQuery(self.getContextElement()).html('bye');
          }
        });
      }
    }
  }

  return Controller;
});