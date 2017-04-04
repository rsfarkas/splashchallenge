(function() {

  this.Modal = function() {

    // Globals
    this.closeButton = null;
    this.modal = null;
    this.overlay = null;
    var oldModal;

    // Determine correct transition end
    this.transitionEnd = transitionSelect();

    // Object defaults
    var defaults = {
      content: "",
      top: 50,
      maxWidth: 600,
      minWidth: 280,
      overlay: true
    }

    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    }

  }

  // Public Methods
  Modal.prototype.close = function() {
    var _ = this;
    this.modal.className = this.modal.className.replace(" main-open", "");
    this.overlay.className = this.overlay.className.replace(" main-open",
      "");
    this.modal.addEventListener(this.transitionEnd, function() {
      _.modal.parentNode.removeChild(_.modal);
    });
    this.overlay.addEventListener(this.transitionEnd, function() {
      if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
    });
  }

  Modal.prototype.open = function() {
    removeOpenModal(this);
    buildOut.call(this);
    initializeEvents.call(this);
    window.getComputedStyle(this.modal).height;
    this.modal.className = this.modal.className +
      (this.modal.offsetHeight > window.innerHeight ?
        " main-open main-anchored" : " main-open");
      this.overlay.className = this.overlay.className + " main-open";
  }

  // Private Methods
  function removeOpenModal() {
    if($('.main-open').is(':visible')){
      $(oldModal).remove();
    };
  };

  function buildOut() {

    var content, contentHolder, docFrag;

    if (typeof this.options.content === "string") {
      content = this.options.content;
    } else {
      content = this.options.content.innerHTML;
    }

    //throw exception if no modal content
    if (content == ""){
      throw new Error('Exception: No content in modal instance');
    }

    docFrag = document.createDocumentFragment();

    // Create modal element
    this.modal = document.createElement("div");
    this.modal.className = "main-modal ";
    this.modal.style.top = this.options.top + "%";
    this.modal.style.minWidth = this.options.minWidth + "px";
    this.modal.style.maxWidth = this.options.maxWidth + "px";

    this.closeButton = document.createElement("button");
    this.closeButton.className = "main-close close-button";
    this.closeButton.innerHTML = "&times;";
    this.modal.appendChild(this.closeButton);

    // If overlay is true, add one
    if (this.options.overlay === true) {
      this.overlay = document.createElement("div");
      this.overlay.className = "main-overlay " + this.options.className;
      docFrag.appendChild(this.overlay);
    }


    // Create content area and append to modal
    contentHolder = document.createElement("div");
    contentHolder.innerHTML = content;
    this.modal.appendChild(contentHolder);

    // Append modal to DocumentFragment
    docFrag.appendChild(this.modal);

    // Append DocumentFragment to body
    document.body.appendChild(docFrag);

    oldModal = this.modal;
  }

  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

  function initializeEvents() {

    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', this.close.bind(this));
    }

  }


  function transitionSelect() {
    var el = document.createElement("div");
    if (el.style.WebkitTransition) return "webkitTransitionEnd";
    if (el.style.OTransition) return "oTransitionEnd";
    return 'transitionend';
  }

}());

//modal first instance
var myContent = document.getElementById('content')

var myModal = new Modal({
  content: myContent,
});

var triggerButton = document.getElementById('trigger');

triggerButton.addEventListener('click', function() {
  myModal.open();
});

//modal second instance
var myContent2 = document.getElementById('content2')

var myModal2 = new Modal({
  content: myContent2,
});

var triggerButton = document.getElementById('trigger2');

triggerButton.addEventListener('click', function() {
  myModal2.open();
});

//modal third instance
var myContent3 = document.getElementById('content3')

var myModal3 = new Modal({
  content: myContent3,
});

var triggerButton = document.getElementById('trigger3');

triggerButton.addEventListener('click', function() {
  myModal3.open();
});

//modal fourth instance
var myContent4 = document.getElementById('content4')

var myModal4 = new Modal({
  content: myContent4,
});

var triggerButton = document.getElementById('trigger4');

triggerButton.addEventListener('click', function() {
  myModal4.open();
});
