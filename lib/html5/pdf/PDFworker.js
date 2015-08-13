function createPromiseCapability(){var e={};e.promise=new Promise(function(d,c){e.resolve=d;e.reject=c});return e}
(function(e){function d(b){this._status=c;this._handlers=[];try{b.call(this,this._resolve.bind(this),this._reject.bind(this))}catch(a){this._reject(a)}}if(e.Promise)"function"!==typeof e.Promise.all&&(e.Promise.all=function(b){var a=0,c=[],d,g,h=new e.Promise(function(b,a){d=b;g=a});b.forEach(function(b,k){a++;b.then(function(b){c[k]=b;a--;0===a&&d(c)},g)});0===a&&d(c);return h}),"function"!==typeof e.Promise.resolve&&(e.Promise.resolve=function(b){return new e.Promise(function(a){a(b)})}),"function"!==
typeof e.Promise.reject&&(e.Promise.reject=function(b){return new e.Promise(function(a,c){c(b)})}),"function"!==typeof e.Promise.prototype.catch&&(e.Promise.prototype.catch=function(b){return e.Promise.prototype.then(void 0,b)});else{var c=0,b=2,a={handlers:[],running:!1,unhandledRejections:[],pendingRejectionCheck:!1,scheduleHandlers:function(b){b._status!==c&&(this.handlers=this.handlers.concat(b._handlers),b._handlers=[],this.running||(this.running=!0,setTimeout(this.runHandlers.bind(this),0)))},
runHandlers:function(){for(var a=Date.now()+1;0<this.handlers.length;){var c=this.handlers.shift(),d=c.thisPromise._status,e=c.thisPromise._value;try{1===d?"function"===typeof c.onResolve&&(e=c.onResolve(e)):"function"===typeof c.onReject&&(e=c.onReject(e),d=1,c.thisPromise._unhandledRejection&&this.removeUnhandeledRejection(c.thisPromise))}catch(g){d=b,e=g}c.nextPromise._updateStatus(d,e);if(Date.now()>=a)break}0<this.handlers.length?setTimeout(this.runHandlers.bind(this),0):this.running=!1},addUnhandledRejection:function(b){this.unhandledRejections.push({promise:b,
time:Date.now()});this.scheduleRejectionCheck()},removeUnhandeledRejection:function(b){b._unhandledRejection=!1;for(var a=0;a<this.unhandledRejections.length;a++)this.unhandledRejections[a].promise===b&&(this.unhandledRejections.splice(a),a--)},scheduleRejectionCheck:function(){this.pendingRejectionCheck||(this.pendingRejectionCheck=!0,setTimeout(function(){this.pendingRejectionCheck=!1;for(var b=Date.now(),a=0;a<this.unhandledRejections.length;a++)if(500<b-this.unhandledRejections[a].time){var c=
this.unhandledRejections[a].promise._value,d="Unhandled rejection: "+c;c.stack&&(d+="\n"+c.stack);warn(d);this.unhandledRejections.splice(a);a--}this.unhandledRejections.length&&this.scheduleRejectionCheck()}.bind(this),500))}};d.all=function(a){function c(a){g._status!==b&&(m=[],l(a))}var e,l,g=new d(function(b,a){e=b;l=a}),h=a.length,m=[];if(0===h)return e(m),g;for(var p=0,t=a.length;p<t;++p){var r=a[p],q=function(a){return function(c){g._status!==b&&(m[a]=c,h--,0===h&&e(m))}}(p);d.isPromise(r)?
r.then(q,c):q(r)}return g};d.isPromise=function(a){return a&&"function"===typeof a.then};d.resolve=function(a){return new d(function(b){b(a)})};d.reject=function(a){return new d(function(b,c){c(a)})};d.prototype={_status:null,_value:null,_handlers:null,_unhandledRejection:null,_updateStatus:function(c,f){1!==this._status&&this._status!==b&&(1===c&&d.isPromise(f)?f.then(this._updateStatus.bind(this,1),this._updateStatus.bind(this,b)):(this._status=c,this._value=f,c===b&&0===this._handlers.length&&
(this._unhandledRejection=!0,a.addUnhandledRejection(this)),a.scheduleHandlers(this)))},_resolve:function(a){this._updateStatus(1,a)},_reject:function(a){this._updateStatus(b,a)},then:function(b,c){var e=new d(function(a,b){this.resolve=a;this.reject=b});this._handlers.push({thisPromise:this,onResolve:b,onReject:c,nextPromise:e});a.scheduleHandlers(this);return e},catch:function(a){return this.then(void 0,a)}};e.Promise=d}})("undefined"===typeof window?this:window);var comObjToHandler={};
(function(e){e.MessageHandler=function(d,c){this.name=d;this.comObj=c;this.callbackIndex=1;this.postMessageTransfers=!0;var b=this.callbacksCapabilities={},a=this.actionHandler={},k=this.actionHandlerAsync={};this.nextAsync=null;var f=this,n=!1;a.console_log=[function(a){e.utils.log(a)}];a.console_error=[function(a){e.utils.error(a)}];a.workerLoaded=[function(a){}];a.worker_restart=[function(a){var b=c,k=comObjToHandler[b];setTimeout(function(){b.removeEventListener("message",k);b.terminate();b=null},
5E3);f.newWorker=new Worker(a.location);f.tempWorker={redirectQueue:[],queue:[],postMessage:function(a,b){this.queue[this.queue.length]={msg:a,transfers:b}}};e.utils.log("I resize "+a.size);f.comObj=c=f.tempWorker;comObjToHandler[f.newWorker]=k;f.newWorker.addEventListener("message",k);b.onerror&&(f.newWorker.onerror=f.tempWorker.onerror=b.onerror);f.oldQueue=a.queue;a.queue=null;n||(f.on("InitWorker",function(a){f.comObj=c=f.newWorker;for(a=0;a<f.oldQueue.length;++a){var b=f.oldQueue[a];f.postMessage(b)}for(a=
0;a<f.tempWorker.redirectQueue.length;++a)b=f.tempWorker.redirectQueue[a],f.postMessage(b);for(a=0;a<f.tempWorker.queue.length;++a)b=f.tempWorker.queue[a],f.comObj.postMessage(b.msg,b.transfers);f.oldQueue=null;f.tempWorker=null;f.newWorker=null}),n=!0);f.newWorker.postMessage({action:"InitWorker",data:a})}];a.redirect_request=[function(a){c.redirectQueue?c.redirectQueue[c.redirectQueue.length]=a:(e.utils.log("Redirect Request needed to be posted."),f.postMessage(a))}];c in comObjToHandler&&c.removeEventListener("message",
comObjToHandler[c]);comObjToHandler[c]=function(c){var d=c.data;if(d.isReply)if(c=d.callbackId,c in b){var n=b[c];delete b[c];"error"in d?n.reject(d.error):n.resolve(d.data)}else e.utils.warn("Cannot resolve callback "+c);else if(d.action in a){var m=a[d.action];d.callbackId?Promise.resolve().then(function(){return m[0].call(m[1],d.data)}).then(function(a){f.postMessage({isReply:!0,callbackId:d.callbackId,data:a})},function(a){f.postMessage({isReply:!0,callbackId:d.callbackId,error:a})}):m[0].call(m[1],
d.data)}else d.action in k?(m=k[d.action],c=createPromiseCapability(),d.callbackId?c.promise.then(function(a){f.postMessage({isReply:!0,callbackId:d.callbackId,data:a});f.nextAsync()},function(a){f.postMessage({isReply:!0,callbackId:d.callbackId,error:a});f.nextAsync()}):c.promise.then(function(a){f.nextAsync()},function(a){f.nextAsync()}),m[0].call(m[1],d,c)):e.utils.error("Unknown action from worker: "+d.action)};c.addEventListener("message",comObjToHandler[c])};e.MessageHandler.prototype={on:function(d,
c,b){var a=this.actionHandler;a[d]&&e.utils.error('There is already an actionName called "'+d+'"');a[d]=[c,b]},replace:function(d,c,b){this.actionHandler[d]=[c,b]},onAsync:function(d,c,b){var a=this.actionHandlerAsync;a[d]&&e.utils.error('There is already an actionName called "'+d+'"');a[d]=[c,b]},replaceAsync:function(d,c,b){var a=this.actionHandlerAsync,k=this.actionHandler;k[d]&&delete k[d];a[d]=[c,b]},onNextAsync:function(d){this.nextAsync=d},send:function(d,c){this.postMessage({action:d,data:c})},
sendWithPromise:function(d,c,b){var a=this.callbackIndex++;d={action:d,data:c,callbackId:a,priority:b};c=createPromiseCapability();this.callbacksCapabilities[a]=c;try{this.postMessage(d)}catch(k){c.reject(k)}return c.promise},sendWithPromiseReturnId:function(d,c,b){var a=this.callbackIndex++;d={action:d,data:c,callbackId:a,priority:b};c=createPromiseCapability();this.callbacksCapabilities[a]=c;try{this.postMessage(d)}catch(k){c.reject(k)}return{promise:c.promise,callbackId:a}},sendWithPromiseWithId:function(d,
c,b,a){c>this.callbackIndex&&e.utils.error("Can't reuse callbackId "+c+" lesser than callbackIndex "+this.callbackIndex);c in this.callbacksCapabilities&&e.utils.error("Can't reuse callbackId "+c+". There is a capability waiting to be resolved. ");d={action:d,data:b,callbackId:c};b=createPromiseCapability();this.callbacksCapabilities[c]=b;try{this.postMessage(d)}catch(k){b.reject(k)}return b.promise},getPromise:function(d){if(d in this.callbacksCapabilities)return this.callbacksCapabilities[d];e.utils.error("Cannot get promise for callback "+
d)},cancelPromise:function(d){if(d in this.callbacksCapabilities){var c=this.callbacksCapabilities[d];delete this.callbacksCapabilities[d];c.reject({type:"Cancelled",message:"Request has been cancelled."});this.postMessage({action:"actionCancel",data:{callbackId:d}})}else e.utils.error("Cannot cancel callback "+d)},postMessage:function(d){if(this.postMessageTransfers){var c=this.getTransfersArray(d);this.comObj.postMessage(d,c)}else this.comObj.postMessage(d)},getObjectTransfers:function(d,c){if("object"===
typeof d)if(d instanceof Uint8Array)c.push(d.buffer);else if(d instanceof ArrayBuffer)c.push(d);else for(prop in d)d.hasOwnProperty(prop)&&this.getObjectTransfers(d[prop],c)},getTransfersArray:function(d){var c=[];this.getObjectTransfers(d,c);return 0==c.length?void 0:c}}})("undefined"===typeof window?this:window);(function(e){var d=e._trnDebugMode;"undefined"===typeof e.utils&&(e.utils={warn:function(c){d&&console.warn(c)},log:function(c){d&&console.log(c)},error:function(c){d&&console.error(c);throw Error(c);}});e.info=function(c){e.utils.log(c)};e.warn=function(c){e.utils.warn(c)};e.error=function(c){e.utils.error(c)}})("undefined"===typeof window?this:window);(function(e){e.Module={TOTAL_MEMORY:218103808,noExitRuntime:!0,devicePixelRatio:1,cur_doc:null,cache_ptr_size:0,has_buf_ownership:!0,loaded:!1,init_cb:null,buf:null,cache_ptr:null,cleanupState:null,stopped:!1,GetPageDimensions:function(){var d=Module.GetPageCount(Module.cur_doc);if(0===d)throw"This document has no pages.";for(var c=Array(d),b=0;b<d;++b){var a=Module.GetPage(Module.cur_doc,b+1),k=Module.PageGetPageWidth(a),f=Module.PageGetPageHeight(a),a=Module.PageGetDefaultMatrixAsArray(a);c[b]=
{width:k,height:f,matrix:a}}return c},loadDoc:function(d){"undefined"===typeof Module&&this._main();var c=null;try{Module.cur_doc&&(Module.PDFDocDestroy(Module.cur_doc),Module.cur_doc=0,Module.clearDocBackend());Module.cur_doc=Module.CreateDoc(d);if(Module.PDFDocInitSecurityHandler(Module.cur_doc))return Module.GetPageDimensions();c={type:"NeedsPassword",message:"This document requires a password"}}catch(b){c={type:"InvalidPDF",message:b}}throw c;},loadCanvas:function(d,c,b,a,k,f){Module.cur_doc||
e.utils.warn("No document loaded");return Module.RasterizePage(Module.cur_doc,d+1,c,b,k,a,f)},loadResources:function(d,c){Module.Initialize(c);e.utils.log("PDFNet initialized!");Module.f0(!1);var b=new Uint8Array(d);Module.PDFNetSetResourceData(b)},_main:function(){enlargeMemory=function(){var d=new Uint8Array(new ArrayBuffer(Module.res_ptr_size)),c=new Uint8Array(Module.HEAPU8.buffer,Module.res_ptr,Module.res_ptr_size);d.set(c);if(Module.buf)Module.workerRestartCallback(1.5*TOTAL_MEMORY,d.buffer,
Module.buf),Module.buf=null;else if(Module.cur_doc){var b=new Uint8Array(new ArrayBuffer(Module.cache_ptr_size)),c=new Uint8Array(Module.HEAPU8.buffer,Module.cache_ptr,Module.cache_ptr_size);b.set(c);Module.workerRestartCallback(1.5*TOTAL_MEMORY,d.buffer,b.buffer)}else Module.workerRestartCallback(1.5*TOTAL_MEMORY,d.buffer,null);Module.HEAPU8=null};"undefined"===typeof Module&&(("undefined"!==typeof window?window:self).Module={});(function(d){d.PDFDocExportXFDF=function(){var c=Module.Runtime.stackSave(),
b;try{var a=Module.PDFDocFDFExtract(Module.cur_doc);b=Module.FDFDocSaveAsXFDF(a);Module.Runtime.stackRestore(c)}catch(k){throw Module.Runtime.stackRestore(c),k;}return b};d.cancelCurrent=function(){var c=Module.cleanupState;return c?(clearTimeout(c.timeout),c.cleanupArr.forEach(function(b){b()}),Module.cleanupState=null,!0):!1};d.SetWorkerRestartCallback=function(c){Module.workerRestartCallback=c};d.SaveDoc=function(c,b){var a=[];try{var k=Module.Runtime.stackSave();a[a.length]=function(){Module.Runtime.stackRestore(k)};
for(var f=Module.PDFDocGetPageIterator(Module.cur_doc);Module.IteratorHasNext(f);){var e=Module.IteratorCurrent(f);try{for(var l=Module.PageGetNumAnnots(e);0<l;){var g=Module.PageGetAnnot(e,--l);switch(Module.AnnotGetType(g)){case 1:case 16:case 17:case 18:case 19:break;default:d.PageAnnotRemove(e,l)}}}catch(h){Module.ObjErase(e,"Annots")}Module.IteratorNext(f)}var m=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f1(Module.GetUStringFromJSString(c),m));var p=Module.getValue(m,"i8*");REX(Module.f2(Module.cur_doc,
p));for(f=Module.PDFDocGetPageIterator(Module.cur_doc);Module.IteratorHasNext(f);){e=Module.IteratorCurrent(f);try{for(l=Module.PageGetNumAnnots(e);0<l;)g=Module.PageGetAnnot(e,--l),Module.AnnotHasAppearance(g)||Module.AnnotRefreshAppearance(g)}catch(t){Module.ObjErase(e,"Annots")}Module.IteratorNext(f)}var r=Module.allocate(4,"i8",Module.ALLOC_STACK),q=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f3(Module.cur_doc,2,0,q,r));var u=Module.getValue(r,"i8*"),v=Module.getValue(q,"i8*"),s=new Uint8Array(new ArrayBuffer(v)),
w=new Uint8Array(Module.HEAPU8.buffer,u,v);s.set(w);Module.clearDocBackend();Module.cache_ptr=u;Module.cache_ptr_size=v;Module.has_buf_ownership=!1;setTimeout(function(){a.forEach(function(a){a()});b.resolve({fileData:s})},0)}catch(x){a.forEach(function(a){a()}),Module.stopped||b.reject(x)}};d.GetCurrentCanvasData=function(c){var b=Module.currentRenderData;if(!b)return null;c&&REX(Module.f4(b.rast));c=new Uint8Array(new ArrayBuffer(b.buf_size));for(var a=0,k=0;k<b.out_height;++k)for(var f=b.bufPtr+
b.stride*k,d=0;d<b.out_width;++d)c[a++]=Module.HEAPU8[f+2],c[a++]=Module.HEAPU8[f+1],c[a++]=Module.HEAPU8[f],c[a++]=Module.HEAPU8[f+3],f+=4;return{pageBuf:c,pageWidth:b.out_width,pageHeight:b.out_height}};d.RasterizePage=function(c,b,a,k,f,d,l){Module.currentRenderData={};var g=Module.currentRenderData;g.out_width=parseInt(a);g.out_height=parseInt(k);var h=[];h.push(function(){Module.currentRenderData=null});try{var m=Module.GetPage(c,b),p=Module.PageGetPageWidth(m),t=Module.PageGetPageHeight(m);
g.stride=4*g.out_width;g.buf_size=g.out_width*g.out_height*4;g.rast=Module.PDFRasterizerCreate();h.push(function(){Module.f5(g.rast)});var r=Module.Runtime.stackSave();h[h.length]=function(){Module.Runtime.stackRestore(r)};var q=Module.PageGetRotation(m);c=1==d||3==d;var q=(1==q||3==q)!=c,u,v=Module.allocate(48,"i8",Module.ALLOC_STACK);if(f){f.x1=f[0];f.y1=f[1];f.x2=f[2];f.y2=f[3];noRotateDefaultMtxPtr=Module.PageGetDefaultMatrix(m,0);invMtxPtr=Module.Matrix2DInverse(noRotateDefaultMtxPtr);f=Module.Matrix2DMultBBox(invMtxPtr,
f);var s;f.x2<f.x1&&(s=f.x1,f.x1=f.x2,f.x2=s);f.y2<f.y1&&(s=f.y1,f.y1=f.y2,f.y2=s);u=g.out_width/(q?f.y2-f.y1:f.x2-f.x1);mtxPtr=Module.GetDefaultMatrixBox(m,f,d)}else mtxPtr=Module.PageGetDefaultMatrix(m,d),u=g.out_width/(c?t:p);Module.Matrix2DSet(v,u,0,0,u,0,0);Module.Matrix2DConcat(v,mtxPtr);g.bufPtr=Module._malloc(g.buf_size);Module._memset(g.bufPtr,255,g.buf_size);h.push(function(){Module._free(g.bufPtr)});var w=Module.allocate(4,"i8",Module.ALLOC_STACK),x=Module.allocate(4,"i8",Module.ALLOC_STACK);
REX(Module.f6(g.rast,0));REX(Module.f7(g.rast,m,g.bufPtr,g.out_width,g.out_height,g.stride,4,!0,v,0,0,0,w));var y=Module.getValue(w,"i8*");h.push(function(){REX(Module.f8(y))});var B=(new Date).getTime(),z=function(){try{for(var a=0,b=(new Date).getTime(),c=!1;200>a;){REX(Module.f9(y,x));if(!Module.getValue(x,"i8*")){c=!0;break}a=(new Date).getTime()-b}if(c){var f=Module.GetCurrentCanvasData(!1);e.utils.log("Total Page Time "+((new Date).getTime()-B));h.forEach(function(a){a()});l.resolve(f)}else Module.cleanupState.timeout=
setTimeout(z,0)}catch(k){h.forEach(function(a){a()}),Module.stopped||l.reject(k)}},A=setTimeout(z,0);Module.cleanupState={cleanupArr:h,timeout:A};h.push(function(){Module.cleanupState=null})}catch(C){h.forEach(function(a){a()}),Module.stopped||l.reject(C)}};d.GetDestinationVPosHPos=function(c){var b=0,a=0,k=!1,f=!1,d=Module.DestinationGetPage(c),e=Module.DestinationGetExplicitDestObj(c),d=Module.PageGetDefaultMatrix(d),d=Module.Matrix2DInverse(d),g=Module.Matrix2DMult(d,{x:a,y:b}),a=g.x,b=g.y,h;try{switch(Module.DestinationGetFitType(c)){case 2:case 6:h=
Module.ObjGetAt(e,2);Module.ObjIsNumber(h)&&(b=Module.ObjGetNumber(h),k=!0);break;case 0:h=Module.ObjGetAt(e,2);Module.ObjIsNumber(h)&&(a=Module.ObjGetNumber(h),f=!0);h=Module.ObjGetAt(e,3);Module.ObjIsNumber(h)&&(b=Module.ObjGetNumber(h),k=!0);break;case 4:h=Module.ObjGetAt(e,2);Module.ObjIsNumber(h)&&(a=Module.ObjGetNumber(h),f=!0);h=Module.ObjGetAt(e,5);Module.ObjIsNumber(h)&&(b=Module.ObjGetNumber(h),k=!0);break;case 3:case 7:h=Module.ObjGetAt(e,2),Module.ObjIsNumber(h)&&(a=Module.ObjGetNumber(h),
f=!0)}g=Module.Matrix2DMult(d,{x:a,y:b});a=g.x;b=g.y;k||(b=0);f||(a=0)}catch(m){a=b=0}return{hpos:a,vpos:b}};d.FillBookmarkTree=function(c,b){for(var a=0;Module.BookmarkIsValid(c);c=Module.BookmarkGetNext(c),++a)try{var d=[];if(Module.BookmarkHasChildren(c)){var f=Module.BookmarkGetFirstChild(c);Module.FillBookmarkTree(f,d)}var e=Module.BookmarkGetTitle(c),d={children:d,name:e},l=Module.BookmarkGetAction(c),g=Module.ActionGetType(l);if(0==g){var h=Module.ActionGetDest(l);if(Module.DestinationIsValid(h)){var m=
Module.DestinationGetPage(h);if(Module.PageIsValid(m)){var p=Module.PageGetIndex(m);if(0<p){d.pageNumber=p;var t=Module.GetDestinationVPosHPos(h);d.verticalOffset=t.vpos;d.horizontalOffset=t.hpos}}}}else if(5==g){var r=Module.ObjFindObj(l,"URI");r&&(d.url=Module.ObjGetAsPDFText(r))}b[b.length]=d}catch(q){}};d.LoadBookmarks=function(){var c=[],b=Module.Runtime.stackSave();try{var a=Module.PDFDocGetFirstBookmark(Module.cur_doc);Module.BookmarkIsValid(a)&&Module.FillBookmarkTree(a,c)}catch(d){}Module.Runtime.stackRestore(b);
return{bookmarks:c}};d.UpdatePassword=function(c){return Module.PDFDocInitStdSecurityHandler(Module.cur_doc,c)?{success:!0,pageDimensions:Module.GetPageDimensions()}:{success:!1}};d.GetTextData=function(c,b){var a=[];try{var d=Module.Runtime.stackSave();a[a.length]=function(){Module.Runtime.stackRestore(d)};var f=Module.GetPage(Module.cur_doc,c),e=Module.allocate(8,"i8",Module.ALLOC_STACK);REX(Module.f10(e));var l=Module.getValue(e,"i8*");a[a.length]=function(){f11(l)};REX(Module.f12(l,f,0,0));var g=
Module.allocate(48,"i8",Module.ALLOC_STACK);REX(Module.f13(f,!0,1,0,g));var h=Module.allocate(4,"i8",Module.ALLOC_STACK),m=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f14(l,g,h,m));var p=Module.getValue(m,"i8*"),t=Module.getValue(h,"i8*");a[a.length]=function(){Module._free(t)};var r=Module.GetJSDoubleArrFromCore(t,p),q=Module.allocate(4,"i8",Module.ALLOC_STACK),u=Module.allocate(4,"i8",Module.ALLOC_STACK),v=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f15(v));a[a.length]=function(){Module.f16(s)};
var s=Module.getValue(v,"i8*");REX(Module.f17(l,s,q,u));var w=Module.GetJSStringFromUString(s),x=Module.getValue(u,"i8*"),y=Module.getValue(q,"i8*");a[a.length]=function(){Module._free(y)};var B=Module.GetJSIntArrayFromCore(y,x),z=Module.allocate(4,"i8",Module.ALLOC_STACK),A=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f18(l,g,z,A));var C=Module.getValue(A,"i8*"),D=Module.getValue(z,"i8*");a[a.length]=function(){Module._free(D)};var E=Module.GetJSDoubleArrFromCore(D,C);setTimeout(function(){a.forEach(function(a){a()});
b.resolve({str:w,quads:r,offsets:B,struct:E})},0)}catch(F){a.forEach(function(a){a()}),Module.stopped||b.reject(F)}}})("undefined"===typeof self?this.Module:self.Module);this.loaded=!0;Module.init_cb&&Module.init_cb()}}})("undefined"===typeof self?this:self);"undefined"===typeof Module&&(("undefined"!==typeof window?window:self).Module={});var crawp=Module.crap;
(function(e){var d=function(b){this.data=b;this.position=0;this.length=this.data.length};d.prototype={read:function(b,a,c){c=this.position+c<=this.length?c:this.length-this.position;b=b.subarray(a,a+c);a=this.data.subarray(this.position,this.position+c);b.set(a);this.position+=c;return c},seek:function(b){this.position=b},close:function(){this.data=null},getPos:function(){return this.position},getTotalSize:function(){return this.length}};var c={open:function(b){b.provider=new d(Module.buf)},close:function(b){b.provider.close()},
read:function(b,a,c,d,e){return b.provider.read(a,c,d)},llseek:function(b,a,c){b=b.provider;1===c?a+=b.getPos():2===c&&(a=b.getTotalSize()+a);if(0>a)throw new Module.FS.ErrnoError(Module.ERRNO_CODES.EINVAL);b.seek(a);return a}};deviceRegistered=!1;THROW=function(b){throw{type:"InvalidPDF",message:b};};REX=function(b){b&&THROW(GetErrToString(b))};GetErrMessage=function(b){return Module.Pointer_stringify(Module.f19(b))};GetErrFunction=function(b){return Module.Pointer_stringify(Module.f20(b))};GetErrLineNumber=
function(b){return Module.Pointer_stringify(Module.f21(b))};GetErrFileName=function(b){return Module.Pointer_stringify(Module.f22(b))};GetErrToString=function(b){return"Exception: \n\t Message: "+GetErrMessage(b)+"\n\t Filename: "+GetErrFileName(b)+"\n\t Function: "+GetErrFunction(b)+"\n\t Linenumber: "+GetErrLineNumber(b)};e.Initialize=function(b){var a=Module.Runtime.stackSave();b=b?Module.allocate(Module.intArrayFromString(b),"i8",Module.ALLOC_STACK):0;REX(Module.f23(b));REX(Module.f24(2));Module.Runtime.stackRestore(a)};
e.clearDocBackend=function(){null!==Module.cache_ptr?(Module.has_buf_ownership&&Module._free(Module.cache_ptr),Module.cache_ptr=null):null!==Module.buf&&(Module.buf=null)};e.CreateDoc=function(b){Module.has_buf_ownership=!0;if(67108864>b.length){Module.cache_ptr_size=b.length;Module.cache_ptr=Module._malloc(b.length);Module.HEAPU8.set(b,Module.cache_ptr);var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f25(Module.cache_ptr,b.length,a))}else this.deviceRegistered||(a=FS.makedev(3,5),FS.registerDevice(a,
c),FS.mkdev("/filedevice",511,a),this.deviceRegistered=!0),Module.buf=b,a=Module.allocate(4,"i8",Module.ALLOC_STACK),b=Module.allocate(Module.intArrayFromString("/filedevice"),"i8",Module.ALLOC_STACK),Module.allocate(Module.intArrayFromString("w+"),"i8",Module.ALLOC_STACK),REX(Module.f26(b,a));return Module.getValue(a,"i8*")};e.GetPageCount=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f27(b,a));return Module.getValue(a,"i8*")};e.GetPage=function(b,a){var c=Module.allocate(4,
"i8",Module.ALLOC_STACK);REX(Module.f28(b,a,c));c=Module.getValue(c,"i8*");Module.PageIsValid(c)||THROW("Trying to access page that doesn't exist at index "+a);return c};e.PageGetPageWidth=function(b){var a=Module.allocate(8,"i8",Module.ALLOC_STACK);REX(Module.f29(b,1,a));return Module.getValue(a,"double")};e.PageGetPageHeight=function(b){var a=Module.allocate(8,"i8",Module.ALLOC_STACK);REX(Module.f30(b,1,a));return Module.getValue(a,"double")};e.PageGetDefaultMatrix=function(b,a){var c=Module.allocate(48,
"i8",Module.ALLOC_STACK);a||(a=0);REX(Module.f13(b,!0,1,a,c));return c};e.PageGetDefaultMatrixAsArray=function(b){var a=Module.Runtime.stackSave(),c=Module.allocate(48,"i8",Module.ALLOC_STACK);REX(Module.f13(b,!0,1,0,c));b=[];for(var d=0;6>d;++d)b[d]=Module.getValue(c+8*d,"double");Module.Runtime.stackRestore(a);return b};e.GetUStringFromJSString=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);b=Module.allocate(Module.intArrayFromString(b),"i8",Module.ALLOC_STACK);REX(Module.f31(b,Module._strlen(b),
5,a));return Module.getValue(a,"i8*")};e.GetJSStringFromUString=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(f32(b,0,0,!1,a));var c=Module.getValue(a,"i8*"),d=Module.allocate(c,"i8",Module.ALLOC_STACK);REX(f32(b,d,Module.getValue(a,"i8*"),!1,a));return Module.Pointer_stringify(d,c)};e.PDFNetSetResourceData=function(b){Module.res_ptr=Module._malloc(b.length);Module.HEAPU8.set(b,Module.res_ptr);REX(Module.f33(Module.res_ptr,b.length));Module.res_ptr_size=b.length};e.PDFDrawSetDPI=
function(b,a){REX(Module.f34(b,a))};e.PDFDocDestroy=function(b){REX(Module.f35(b))};e.PDFRasterizerCreate=function(){var b=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f36(0,b));return Module.getValue(b,"i8*")};e.PageGetRotation=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f37(b,a));return Module.getValue(a,"i8*")};e.GetDefaultMatrixBox=function(b,a,c){var d=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f37(b,d));b=(Module.getValue(d,"i32")+c)%4;c=Module.allocate(48,
"i8",Module.ALLOC_STACK);switch(b){case 0:return REX(Module.f38(c,1,0,0,-1,-a.x1,a.y2)),c;case 1:return REX(Module.f38(c,0,1,1,0,-a.y1,-a.x1)),c;case 2:return REX(Module.f38(c,-1,0,0,1,a.x2,-a.y1)),c;case 3:return REX(Module.f38(c,0,-1,-1,0,a.y2,a.x2)),c}throw Error("Yikes, we don't support that rotation type");};e.Matrix2DMultBBox=function(b,a){var c=Module.allocate(8,"i8",Module.ALLOC_STACK),d=Module.allocate(8,"i8",Module.ALLOC_STACK);Module.setValue(c,a.x1,"double");Module.setValue(d,a.y1,"double");
REX(Module.f39(b,c,d));a.x1=Module.getValue(c,"double");a.y1=Module.getValue(d,"double");Module.setValue(c,a.x2,"double");Module.setValue(d,a.y2,"double");REX(Module.f39(b,c,d));a.x2=Module.getValue(c,"double");a.y2=Module.getValue(d,"double");return a};e.Matrix2DMult=function(b,a){var c=Module.allocate(8,"i8",Module.ALLOC_STACK),d=Module.allocate(8,"i8",Module.ALLOC_STACK);Module.setValue(c,a.x,"double");Module.setValue(d,a.y,"double");REX(Module.f39(b,c,d));a.x=Module.getValue(c,"double");a.y=Module.getValue(d,
"double");return a};e.Matrix2DConcat=function(b,a){var c=Module.getValue(a,"double"),d=Module.getValue(a+8,"double"),e=Module.getValue(a+16,"double"),l=Module.getValue(a+24,"double"),g=Module.getValue(a+32,"double"),h=Module.getValue(a+40,"double");REX(Module.f40(b,c,d,e,l,g,h))};e.Matrix2DSet=function(b,a,c,d,e,l,g){REX(Module.f38(b,a,c,d,e,l,g))};e.IteratorHasNext=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f41(b,a));return 0!=Module.getValue(a,"i8")};e.IteratorCurrent=
function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f42(b,a));return Module.getValue(Module.getValue(a,"i8*"),"i8*")};e.IteratorNext=function(b){REX(Module.f43(b))};e.PDFDocGetPageIterator=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f44(b,1,a));return Module.getValue(a,"i8*")};e.PageGetNumAnnots=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f45(b,a));return Module.getValue(a,"i32")};e.PageGetAnnot=function(b,a){var c=Module.allocate(4,
"i8",Module.ALLOC_STACK);REX(Module.f46(b,a,c));return Module.getValue(c,"i8*")};e.PageAnnotRemove=function(b,a){REX(Module.f47(b,a))};e.AnnotGetType=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f48(b,a));return Module.getValue(a,"i32")};e.AnnotHasAppearance=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f49(b,0,0,a));return 0!=Module.getValue(a,"i8*")};e.AnnotRefreshAppearance=function(b){REX(Module.f50(b))};e.ObjErase=function(b,a){var c=Module.allocate(Module.intArrayFromString(a),
"i8",Module.ALLOC_STACK);REX(Module.f51(b,c))};e.GetJSDoubleArrFromCore=function(b,a){for(var c=Array(a),d=b,e=0;e<a;++e)c[e]=Module.getValue(d,"double"),d+=8;return c};e.GetJSIntArrayFromCore=function(b,a){for(var c=Array(a),d=b,e=0;e<a;++e)c[e]=Module.getValue(d,"i32"),d+=4;return c};e.BookmarkIsValid=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f52(b,a));return 0!=Module.getValue(a,"i8")};e.BookmarkGetNext=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);
REX(Module.f53(b,a));return Module.getValue(a,"i8*")};e.BookmarkGetFirstChild=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f54(b,a));return Module.getValue(a,"i8*")};e.BookmarkHasChildren=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f55(b,a));return 0!=Module.getValue(a,"i8")};e.BookmarkGetAction=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f56(b,a));return Module.getValue(a,"i8*")};e.BookmarkGetTitle=function(b){var a=
Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f57(b,a));b=Module.getValue(a,"i8*");return Module.GetJSStringFromUString(b)};e.ActionGetType=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f58(b,a));return Module.getValue(a,"i32")};e.ActionGetDest=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f59(b,a));return Module.getValue(a,"i8*")};e.DestinationIsValid=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f60(b,a));return 0!=
Module.getValue(a,"i8")};e.DestinationGetPage=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f61(b,a));return Module.getValue(a,"i8*")};e.PageIsValid=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f62(b,a));return 0!=Module.getValue(a,"i8")};e.PageGetIndex=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f63(b,a));return Module.getValue(a,"i32")};e.ObjGetAsPDFText=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);
REX(Module.f64(b,a));b=Module.getValue(a,"i8*");return Module.GetJSStringFromUString(b)};e.ObjFindObj=function(b,a){var c=Module.allocate(4,"i8",Module.ALLOC_STACK),d=allocate(intArrayFromString(a),"i8",ALLOC_STACK).REX(Module.f65(b,d,c));return Module.getValue(c,"i8*")};e.PDFDocGetFirstBookmark=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f66(b,a));return Module.getValue(a,"i8*")};e.DestinationGetExplicitDestObj=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);
REX(Module.f67(b,a));return Module.getValue(a,"i8*")};e.DestinationGetFitType=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f68(b,a));return Module.getValue(a,"i32")};e.ObjIsNumber=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f69(b,a));return 0!=Module.getValue(a,"i8")};e.ObjGetNumber=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f70(b,a));return Module.getValue(a,"double")};e.ObjGetAt=function(b,a){var c=Module.allocate(4,
"i8",Module.ALLOC_STACK);REX(Module.f71(b,a,c));return Module.getValue(c,"i8*")};e.Matrix2DInverse=function(b){var a=Module.allocate(48,"i8",Module.ALLOC_STACK);REX(Module.f72(b,a));return a};e.PDFDocInitSecurityHandler=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f73(b,0,a));return 0!=Module.getValue(a,"i8")};e.PDFDocInitStdSecurityHandler=function(b,a){var c=Module.allocate(4,"i8",Module.ALLOC_STACK),d=allocate(intArrayFromString(a),"i8",ALLOC_STACK);REX(Module.f74(b,
d,Module._strlen(d),c));return 0!=Module.getValue(c,"i8")};e.PDFDocFDFExtract=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(Module.f75(b,2,a));return Module.getValue(a,"i8*")};e.FDFDocSaveAsXFDF=function(b){var a=Module.allocate(4,"i8",Module.ALLOC_STACK);REX(f76(b,a));b=Module.getValue(a,"i8*");return Module.GetJSStringFromUString(b)}})("undefined"===typeof self?this.Module:self.Module);!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var d;"undefined"!=typeof window?d=window:"undefined"!=typeof global?d=global:"undefined"!=typeof self&&(d=self);d.PriorityQueue=e()}}(function(){return function d(c,b,a){function k(l,g){if(!b[l]){if(!c[l]){var h="function"==typeof require&&require;if(!g&&h)return h(l,!0);if(f)return f(l,!0);h=Error("Cannot find module '"+l+"'");throw h.code="MODULE_NOT_FOUND",
h;}h=b[l]={exports:{}};c[l][0].call(h.exports,function(a){var b=c[l][1][a];return k(b?b:a)},h,h.exports,d,c,b,a)}return b[l].exports}for(var f="function"==typeof require&&require,n=0;n<a.length;n++)k(a[n]);return k}({1:[function(d,c,b){var a={}.hasOwnProperty,k=function(b,c){function d(){this.constructor=b}for(var k in c)a.call(c,k)&&(b[k]=c[k]);d.prototype=c.prototype;b.prototype=new d;b.__super__=c.prototype;return b};b=d("./PriorityQueue/AbstractPriorityQueue");d=d("./PriorityQueue/ArrayStrategy");
b=function(a){function b(a){a||(a={});a.strategy||(a.strategy=BinaryHeapStrategy);a.comparator||(a.comparator=function(a,b){return(a||0)-(b||0)});b.__super__.constructor.call(this,a)}k(b,a);return b}(b);b.ArrayStrategy=d;c.exports=b},{"./PriorityQueue/AbstractPriorityQueue":2,"./PriorityQueue/ArrayStrategy":3}],2:[function(d,c,b){c.exports=function(){function a(a){if(null==(null!=a?a.strategy:void 0))throw"Must pass options.strategy, a strategy";if(null==(null!=a?a.comparator:void 0))throw"Must pass options.comparator, a comparator";
this.priv=new a.strategy(a);this.length=0}a.prototype.queue=function(a){this.length++;this.priv.queue(a)};a.prototype.dequeue=function(a){if(!this.length)throw"Empty queue";this.length--;return this.priv.dequeue()};a.prototype.peek=function(a){if(!this.length)throw"Empty queue";return this.priv.peek()};a.prototype.remove=function(a){this.priv.remove(a)&&--this.length};a.prototype.find=function(a){return 0<=this.priv.find(a)};return a}()},{}],3:[function(d,c,b){var a;a=function(a,b,c){var d,g,h;g=
0;for(d=a.length;g<d;)h=g+d>>>1,0<=c(a[h],b)?g=h+1:d=h;return g};c.exports=function(){function b(a){var c;this.options=a;this.comparator=this.options.comparator;this.data=(null!=(c=this.options.initialValues)?c.slice(0):void 0)||[];this.data.sort(this.comparator).reverse()}b.prototype.queue=function(b){var c;c=a(this.data,b,this.comparator);this.data.splice(c,0,b)};b.prototype.dequeue=function(){return this.data.pop()};b.prototype.peek=function(){return this.data[this.data.length-1]};b.prototype.find=
function(b){var c=a(this.data,b,this.comparator)-1;return 0<=c&&!this.comparator(this.data[c],b)?c:-1};b.prototype.remove=function(a){a=this.find(a);return 0<=a?(this.data.splice(a,1),!0):!1};return b}()},{}]},{},[1])(1)});self.shouldResize||importScripts("PDFNetC.js");
(function(e){e.EmscriptenPDFManager=function(){return this};e.EmscriptenPDFManager.prototype={LoadRes:function(c,b){new Uint8Array(c);Module.loadResources(c,b)},OnInitialized:function(c){Module.loaded?c():(Module.init_cb=function(){c()},e.utils.log("PDFNet is not initialized yet!"))},NewDoc:function(c,b){try{var a=new Uint8Array(c),d=Module.loadDoc(a);b.resolve({pageDimensions:d})}catch(e){Module.stopped||b.reject(e)}},UpdatePassword:function(c){return Module.UpdatePassword(c)},GetCanvas:function(c,
b,a,d,e,n){Module.loadCanvas(c,b,a,d,e,n)},GetCanvasProgressive:function(){return Module.GetCurrentCanvasData(!0)},LoadBookmarks:function(){return Module.LoadBookmarks()},LoadText:function(c,b){Module.GetTextData(c+1,b)},SaveDoc:function(c,b){Module.SaveDoc(c,b)},CancelCurrent:function(){return Module.cancelCurrent()},LoadAnnotations:function(){return Module.PDFDocExportXFDF()},SetWorkerRestartCallback:function(c){Module.SetWorkerRestartCallback(c)},Initialize:function(c){Module.TOTAL_MEMORY=c;importScripts("PDFNetC.js")},
Stop:function(){Module.stopped=!0}};var d={setup:function(c){function b(a,b){e.utils.log("Redirected "+a.callbackId);c.send("redirect_request",a)}c.replaceAsync("test",b);c.replaceAsync("NewDoc",b);c.replaceAsync("UpdatePassword",b);c.replaceAsync("LoadRes",b);c.replaceAsync("GetCanvas",b);c.replaceAsync("GetCanvasPartial",b);c.replaceAsync("LoadText",b);c.replaceAsync("SaveDoc",b);c.replaceAsync("LoadBookmarks",b);c.replaceAsync("GetCanvasProgressive",b);c.replaceAsync("LoadAnnotations",b);c.replaceAsync("actionCancel",
b)}};(function(c){function b(a){if(self.shouldResize)n.Initialize(a.size);else{if(!(a instanceof Uint8Array)){c.send("test",!1);return}var b=255===a[0];c.postMessageTransfers=b;if(!("response"in new XMLHttpRequest)){c.send("test",!1);return}}n.OnInitialized(function(){n.SetWorkerRestartCallback(function(a,b,e){d.setup(c);var f=[],g;p&&(p.asyncCallCapability=void 0,f.push(p));for(var h=l.length,k=0;k<h;++k)g=l.dequeue(),g.asyncCallCapability=void 0,f.push(g);c.send("worker_restart",{size:a,queue:f,
docData:e,resData:b,location:"pdf/ResizableWorker.js"});n.Stop();p&&n.CancelCurrent();m();p=null});if(self.shouldResize)if(n.LoadRes(a.resData),a.docData){var e=createPromiseCapability();e.promise.then(function(a){c.send("InitWorker",{})});n.NewDoc(a.docData,e)}else c.send("InitWorker",{});else h(),c.send("test",{supportTypedArray:!0,supportTransfers:b})})}function a(a){p=a;var b=a.data;switch(a.action){case "GetCanvas":n.GetCanvas(b.pageIndex,b.width,b.height,b.rotation,null,a.asyncCallCapability);
break;case "GetCanvasPartial":n.GetCanvas(b.pageIndex,b.width,b.height,b.rotation,b.bbox,a.asyncCallCapability);break;case "NewDoc":if("array"!=b.type)throw Error("Only document type supported is array.");p&&n.CancelCurrent();m();n.NewDoc(b.value,a.asyncCallCapability);break;case "LoadText":n.LoadText(b.pageIndex,a.asyncCallCapability);break;case "SaveDoc":n.SaveDoc(b.xfdfString,a.asyncCallCapability)}}function k(b,c){b.asyncCallCapability=c;p?l.queue(b):a(b)}function f(){if(l.length){var b=l.dequeue();
a(b)}else p=null}var n=new e.EmscriptenPDFManager,l,g=!1,h=function(){g||(c.send("workerLoaded",{}),g=!0)};n.OnInitialized(h);var m=function(){l=new PriorityQueue({strategy:PriorityQueue.ArrayStrategy,comparator:function(a,b){return a.priority===b.priority?a.callbackId-b.callbackId:b.priority-a.priority}})};m();var p=null;c.on("test",b);c.on("InitWorker",b);c.on("UpdatePassword",function(a){return n.UpdatePassword(a.password)});c.on("LoadRes",function(a){n.LoadRes(a.array,a.l);return{}});c.onNextAsync(f);
c.onAsync("NewDoc",k);c.onAsync("GetCanvas",k);c.onAsync("GetCanvasPartial",k);c.onAsync("LoadText",k);c.onAsync("SaveDoc",k);c.on("LoadBookmarks",function(a){return n.LoadBookmarks()});c.on("GetCanvasProgressive",function(a){var b;if(p&&p.callbackId===a.callbackId)b=n.GetCanvasProgressive();else if(l.find({priority:0,callbackId:a.callbackId}))throw{type:"Queued",message:"Rendering has not started yet."};if(!b)throw{type:"Unavailable",message:"Rendering is complete or was cancelled."};return b});
c.on("LoadAnnotations",function(a){return{xfdfString:n.LoadAnnotations()}});c.on("actionCancel",function(a){p&&p.callbackId===a.callbackId?n.CancelCurrent()&&setTimeout(function(){f()},0):l.remove({priority:0,callbackId:a.callbackId})})})(new MessageHandler("worker_processor",this))})("undefined"===typeof window?this:window);