import{EventDispatcher,MOUSE,Quaternion,Spherical,TOUCH,Vector2,Vector3}from"./three.module.js";var OrbitControls=function(e,t){t===void 0&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),t===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=e,this.domElement=t,this.enabled=!0,this.target=new Vector3,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-(1/0),this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!1,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.enableKeys=!0,this.keys={LEFT:37,UP:38,RIGHT:39,BOTTOM:40},this.mouseButtons={LEFT:MOUSE.ROTATE,MIDDLE:MOUSE.DOLLY,RIGHT:MOUSE.PAN},this.touches={ONE:TOUCH.ROTATE,TWO:TOUCH.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=function(){return i.phi},this.getAzimuthalAngle=function(){return i.theta},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(P),n.update(),o=s.NONE},this.update=function(){var t=new Vector3,r=(new Quaternion).setFromUnitVectors(e.up,new Vector3(0,1,0)),d=r.clone().inverse(),c=new Vector3,l=new Quaternion;return function(){var u=n.object.position;return t.copy(u).sub(n.target),t.applyQuaternion(r),i.setFromVector3(t),n.autoRotate&&o===s.NONE&&C(ae()),n.enableDamping?(i.theta+=a.theta*n.dampingFactor,i.phi+=a.phi*n.dampingFactor):(i.theta+=a.theta,i.phi+=a.phi),i.theta=Math.max(n.minAzimuthAngle,Math.min(n.maxAzimuthAngle,i.theta)),i.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,i.phi)),i.makeSafe(),i.radius*=j,i.radius=Math.max(n.minDistance,Math.min(n.maxDistance,i.radius)),n.enableDamping===!0?n.target.addScaledVector(m,n.dampingFactor):n.target.add(m),t.setFromSpherical(i),t.applyQuaternion(d),u.copy(n.target).add(t),n.object.lookAt(n.target),n.enableDamping===!0?(a.theta*=1-n.dampingFactor,a.phi*=1-n.dampingFactor,m.multiplyScalar(1-n.dampingFactor)):(a.set(0,0,0),m.set(0,0,0)),j=1,!!(b||c.distanceToSquared(n.object.position)>I||8*(1-l.dot(n.object.quaternion))>I)&&(n.dispatchEvent(P),c.copy(n.object.position),l.copy(n.object.quaternion),b=!1,!0)}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",W,!1),n.domElement.removeEventListener("mousedown",U,!1),n.domElement.removeEventListener("wheel",M,!1),n.domElement.removeEventListener("touchstart",L,!1),n.domElement.removeEventListener("touchend",z,!1),n.domElement.removeEventListener("touchmove",N,!1),document.removeEventListener("mousemove",O,!1),document.removeEventListener("mouseup",E,!1),n.domElement.removeEventListener("keydown",R,!1)};var l,k,A,n=this,P={type:"change"},w={type:"start"},x={type:"end"},s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},o=s.NONE,I=1e-6,i=new Spherical,a=new Spherical,j=1,m=new Vector3,b=!1,r=new Vector2,u=new Vector2,h=new Vector2,d=new Vector2,c=new Vector2,p=new Vector2,g=new Vector2,f=new Vector2,v=new Vector2;function ae(){return 2*Math.PI/60/60*n.autoRotateSpeed}function y(){return Math.pow(.95,n.zoomSpeed)}function C(e){a.theta-=e}function H(e){a.phi-=e}k=function(){var e=new Vector3;return function(n,s){e.setFromMatrixColumn(s,0),e.multiplyScalar(-n),m.add(e)}}(),A=function(){var e=new Vector3;return function(s,o){n.screenSpacePanning===!0?e.setFromMatrixColumn(o,1):(e.setFromMatrixColumn(o,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(s),m.add(e)}}(),l=function(){var e=new Vector3;return function(s,o){var a,r,i=n.domElement;n.object.isPerspectiveCamera?(r=n.object.position,e.copy(r).sub(n.target),a=e.length(),a*=Math.tan(n.object.fov/2*Math.PI/180),k(2*s*a/i.clientHeight,n.object.matrix),A(2*o*a/i.clientHeight,n.object.matrix)):n.object.isOrthographicCamera?(k(s*(n.object.right-n.object.left)/n.object.zoom/i.clientWidth,n.object.matrix),A(o*(n.object.top-n.object.bottom)/n.object.zoom/i.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function _(e){n.object.isPerspectiveCamera?j/=e:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*e)),n.object.updateProjectionMatrix(),b=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function F(e){n.object.isPerspectiveCamera?j*=e:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/e)),n.object.updateProjectionMatrix(),b=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function T(e){r.set(e.clientX,e.clientY)}function ie(e){g.set(e.clientX,e.clientY)}function S(e){d.set(e.clientX,e.clientY)}function oe(e){u.set(e.clientX,e.clientY),h.subVectors(u,r).multiplyScalar(n.rotateSpeed);var t=n.domElement;C(2*Math.PI*h.x/t.clientHeight),H(2*Math.PI*h.y/t.clientHeight),r.copy(u),n.update()}function se(e){f.set(e.clientX,e.clientY),v.subVectors(f,g),v.y>0?_(y()):v.y<0&&F(y()),g.copy(f),n.update()}function ne(e){c.set(e.clientX,e.clientY),p.subVectors(c,d).multiplyScalar(n.panSpeed),l(p.x,p.y),d.copy(c),n.update()}function te(){}function ee(e){e.deltaY<0?F(y()):e.deltaY>0&&_(y()),n.update()}function Y(e){var t=!1;switch(e.keyCode){case n.keys.UP:l(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:l(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:l(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:l(-n.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),n.update())}function B(e){if(e.touches.length==1)r.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),n=.5*(e.touches[0].pageY+e.touches[1].pageY);r.set(t,n)}}function V(e){if(e.touches.length==1)d.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),n=.5*(e.touches[0].pageY+e.touches[1].pageY);d.set(t,n)}}function $(e){var t=e.touches[0].pageX-e.touches[1].pageX,n=e.touches[0].pageY-e.touches[1].pageY,s=Math.sqrt(t*t+n*n);g.set(0,s)}function J(e){n.enableZoom&&$(e),n.enablePan&&V(e)}function Z(e){n.enableZoom&&$(e),n.enableRotate&&B(e)}function K(e){if(e.touches.length==1)u.set(e.touches[0].pageX,e.touches[0].pageY);else{var t,s=.5*(e.touches[0].pageX+e.touches[1].pageX),o=.5*(e.touches[0].pageY+e.touches[1].pageY);u.set(s,o)}h.subVectors(u,r).multiplyScalar(n.rotateSpeed),t=n.domElement,C(2*Math.PI*h.x/t.clientHeight),H(2*Math.PI*h.y/t.clientHeight),r.copy(u)}function q(e){if(e.touches.length==1)c.set(e.touches[0].pageX,e.touches[0].pageY);else{var t=.5*(e.touches[0].pageX+e.touches[1].pageX),s=.5*(e.touches[0].pageY+e.touches[1].pageY);c.set(t,s)}p.subVectors(c,d).multiplyScalar(n.panSpeed),l(p.x,p.y),d.copy(c)}function D(e){var t=e.touches[0].pageX-e.touches[1].pageX,s=e.touches[0].pageY-e.touches[1].pageY,o=Math.sqrt(t*t+s*s);f.set(0,o),v.set(0,Math.pow(f.y/g.y,n.zoomSpeed)),_(v.y),g.copy(f)}function G(e){n.enableZoom&&D(e),n.enablePan&&q(e)}function X(e){n.enableZoom&&D(e),n.enableRotate&&K(e)}function Q(){}function U(e){if(n.enabled===!1)return;e.preventDefault(),n.domElement.focus?n.domElement.focus():window.focus();var t;switch(e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case MOUSE.DOLLY:if(n.enableZoom===!1)return;ie(e),o=s.DOLLY;break;case MOUSE.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(n.enablePan===!1)return;S(e),o=s.PAN}else{if(n.enableRotate===!1)return;T(e),o=s.ROTATE}break;case MOUSE.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(n.enableRotate===!1)return;T(e),o=s.ROTATE}else{if(n.enablePan===!1)return;S(e),o=s.PAN}break;default:o=s.NONE}o!==s.NONE&&(document.addEventListener("mousemove",O,!1),document.addEventListener("mouseup",E,!1),n.dispatchEvent(w))}function O(e){if(n.enabled===!1)return;switch(e.preventDefault(),o){case s.ROTATE:if(n.enableRotate===!1)return;oe(e);break;case s.DOLLY:if(n.enableZoom===!1)return;se(e);break;case s.PAN:if(n.enablePan===!1)return;ne(e);break}}function E(e){if(n.enabled===!1)return;te(e),document.removeEventListener("mousemove",O,!1),document.removeEventListener("mouseup",E,!1),n.dispatchEvent(x),o=s.NONE}function M(e){if(n.enabled===!1||n.enableZoom===!1||o!==s.NONE&&o!==s.ROTATE)return;e.preventDefault(),e.stopPropagation(),n.dispatchEvent(w),ee(e),n.dispatchEvent(x)}function R(e){if(n.enabled===!1||n.enableKeys===!1||n.enablePan===!1)return;Y(e)}function L(e){if(n.enabled===!1)return;switch(e.preventDefault(),e.touches.length){case 1:switch(n.touches.ONE){case TOUCH.ROTATE:if(n.enableRotate===!1)return;B(e),o=s.TOUCH_ROTATE;break;case TOUCH.PAN:if(n.enablePan===!1)return;V(e),o=s.TOUCH_PAN;break;default:o=s.NONE}break;case 2:switch(n.touches.TWO){case TOUCH.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;J(e),o=s.TOUCH_DOLLY_PAN;break;case TOUCH.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;Z(e),o=s.TOUCH_DOLLY_ROTATE;break;default:o=s.NONE}break;default:o=s.NONE}o!==s.NONE&&n.dispatchEvent(w)}function N(e){if(n.enabled===!1)return;switch(e.preventDefault(),e.stopPropagation(),o){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;K(e),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;q(e),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;G(e),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;X(e),n.update();break;default:o=s.NONE}}function z(e){if(n.enabled===!1)return;Q(e),n.dispatchEvent(x),o=s.NONE}function W(e){if(n.enabled===!1)return;e.preventDefault()}n.domElement.addEventListener("contextmenu",W,!1),n.domElement.addEventListener("mousedown",U,!1),n.domElement.addEventListener("wheel",M,!1),n.domElement.addEventListener("touchstart",L,!1),n.domElement.addEventListener("touchend",z,!1),n.domElement.addEventListener("touchmove",N,!1),n.domElement.addEventListener("keydown",R,!1),n.domElement.tabIndex===-1&&(n.domElement.tabIndex=0),this.update()},MapControls;OrbitControls.prototype=Object.create(EventDispatcher.prototype),OrbitControls.prototype.constructor=OrbitControls,MapControls=function(e,t){OrbitControls.call(this,e,t),this.mouseButtons.LEFT=MOUSE.PAN,this.mouseButtons.RIGHT=MOUSE.ROTATE,this.touches.ONE=TOUCH.PAN,this.touches.TWO=TOUCH.DOLLY_ROTATE},MapControls.prototype=Object.create(EventDispatcher.prototype),MapControls.prototype.constructor=MapControls;export{OrbitControls,MapControls}