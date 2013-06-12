/// <reference path="../Libraries/jquery-1.7.2.min.js" />
/// <reference path="../Libraries/sinon.js" />
/// <reference path="../Libraries/jasmine-jquery.js" />
/// <reference path="../Libraries/mojo.js" />
/// <reference path="../Libraries/mojoTestHelper.js" />
/// <reference path="./SampleController.js" />

describe("Mojo controller", function () {
  var controller
  , element = jQuery('<div id="context"></div>');

  beforeEach(function () {
    var helper = new MojoTestHelper();
    controller = helper.SetupController(element, 'SampleController');
  });

  it('should be defined', function () {
    expect(controller).toBeDefined();
  });
  it('prototype initialize should be defined', function () {
    expect(controller.initialize).toBeDefined();
  });
  it('prototype getContextElement should be defined', function () {
    expect(controller.getContextElement).toBeDefined();
  });
  it('prototype getContextElement should return correct context', function () {
    expect(controller.getContextElement()).toBe('div#context');
  });
  it('methods should be defined', function () {
    expect(controller.methods).toBeDefined();
  });

  describe('GetSelf', function () {
    it('should be defined', function () {
      expect(controller.GetSelf).toBeDefined();
    });
    it('should return a defined object', function () {
      expect(controller.GetSelf()).toBeDefined();
    });
    it('returned object should have prototype getContextElement', function () {
      expect(controller.GetSelf().getContextElement).toBeDefined();
    });
    it('is an instance of controller', function () {
      expect(controller.GetSelf() instanceof controller.constructor).toBeTruthy();
    });
  });

  describe('Initialize', function () {
    it('should be defined', function () {
      expect(controller.Initialize).toBeDefined();
    });
    it('should call getContextElement without problems', function () {
      controller.Initialize();
    });
  });

  describe('DoSomeXhr', function () {
    var spy, stub, xhr, requests, ServiceLocator;

    beforeEach(function () {
      ServiceLocator = mojo.ServiceLocator;
      ServiceLocator.addService(new mojo.Service('getSomething', '/UriToServiceMethod', { wrapped: true }));
      spy = sinon.spy(ServiceLocator, 'getService');
      stub = sinon.stub(controller, 'getContextElement').returns(element);
      window.ServiceLocator = ServiceLocator;

      // setup the xhr proxy
      requests = [];
      xhr = sinon.useFakeXMLHttpRequest();
      xhr.onCreate = function (xhr) {
        requests.push(xhr);
      }

      controller.DoSomeXhr();
    });
    afterEach(function () {
      spy.restore();
      stub.restore();
    });

    it('should be defined', function () {
      expect(controller.DoSomeXhr).toBeDefined();
    });
    it('calls getSomething webservice', function () {
      sinon.assert.calledWith(spy, 'getSomething');
    });
    it('on Success true, it modifies the dom correctly', function () {
      requests[0].respond(200, { "Content-Type": "application/json" }, '{ "UriToServiceMethodResult": { "Success": true, "Message": null, "Data": {} } }');
      expect(requests.length).toBe(1);
      expect(jQuery(controller.getContextElement()).html()).toBe('hi');
    });
    it('on Success false, it modifies the dom correctly', function () {
      requests[0].respond(200, { "Content-Type": "application/json" }, '{ "UriToServiceMethodResult": { "Success": false, "Message": null, "Data": {} } }');
      expect(requests.length).toBe(1);
      expect(jQuery(controller.getContextElement()).html()).toBe('bye');
    });
  });

  describe('jasmine-jquery examples', function () {
    it('should load jasmine-jquery', function () {
      expect(jQuery('<div id="some-id"></div>')).toBe('div');
      expect(jQuery('<div style="display: none; margin: 10px;"></div>')).toHaveCss({ margin: "10px" });
      expect(jQuery('<input type="checkbox" checked="checked"/>')).toBeChecked();
    });
  });
});