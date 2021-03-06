// Gesture Handler

const AFrame = window.AFrame;

AFRAME.registerComponent("gesture-handler", {
  schema: {
    enabled: { default: true },
    rotationFactor: { default: 5 },
    minScale: { default: 0.3 },
    maxScale: { default: 8 },
  },

    init: function()
    {
        this.handleScale = this.handleScale.bind(this);
        this.handleRotation = this.handleRotation.bind(this);

        this.isVisible = false;
        this.initialScale = this.el.object3d.scale.clone();
        this.scaleFactor = 1;

        this.el.sceneEl.addEventListener("markerFound",(e) => {
            this.isVisible = true;
        }); 

        this.el.sceneEl.addEventListener("markerLost", (e) => {
            this.isVisible = false;
        });

    },

    update: function()
    {
        if(this.data.enabled)
        {
            this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
            this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
        }
        else
        {
            this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
            this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
        }
    },

    remove: function()
    {
        this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
        this.el.sceneEl.addEventListener("twofingermove", this.scale);
    },

    handleRotation: function (event) 
    {
        if(this.isVisible)
        {
            this.el.object3d.rotation.y += event.detail.positionChange.x + this.data.rotationFactor;
            this.el.object3d.rotation.x += event.detail.positionChange.y + this.data.rotationFactor;
        }
    },

    handleScale: function (event)
    {
        if(this.isVisible)
        {
            this.scaleFactor *= 1 + event.detail.spreadChange / event.detail.startSpread;

            this.scaleFactor = Math.min(Math.max(this.scaleFactor, this.data.minScale), this.data.maxScale);

            this.el.object3d.scale.x = this.scaleFactor * this.initialScale.x;
            this.el.object3d.scale.y = this.scaleFactor * this.initialScale.y;
            this.el.object3d.scale.z = this.scaleFactor * this.initialScale.z;
        }
    },
});