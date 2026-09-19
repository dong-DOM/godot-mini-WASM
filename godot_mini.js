// godot-mini-wasm v0.1.0 — ESM bundle (emscripten core + facade)
// Derived from the Godot Engine architecture (MIT). See README.md / PATCHES.md.

var GDMCoreFactory = (() => {
  var _scriptName = import.meta.url;
  
  return (
async function(moduleArg = {}) {
  var moduleRtn;

var Module=moduleArg;var readyPromiseResolve,readyPromiseReject;var readyPromise=new Promise((resolve,reject)=>{readyPromiseResolve=resolve;readyPromiseReject=reject});var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof WorkerGlobalScope!="undefined";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&process.type!="renderer";if(ENVIRONMENT_IS_NODE){const{createRequire}=await import("module");let dirname=import.meta.url;if(dirname.startsWith("data:")){dirname="/"}var require=createRequire(dirname)}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");if(!import.meta.url.startsWith("data:")){scriptDirectory=nodePath.dirname(require("url").fileURLToPath(import.meta.url))+"/"}readBinary=filename=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename);return ret};readAsync=async(filename,binary=true)=>{filename=isFileURI(filename)?new URL(filename):filename;var ret=fs.readFileSync(filename,binary?undefined:"utf8");return ret};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(_scriptName){scriptDirectory=_scriptName}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{readAsync=async url=>{var response=await fetch(url,{credentials:"same-origin"});if(response.ok){return response.arrayBuffer()}throw new Error(response.status+" : "+response.url)}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];var wasmBinary=Module["wasmBinary"];var wasmMemory;var ABORT=false;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);readyPromiseReject(e);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){if(Module["locateFile"]){var f="godot_mini.wasm";if(!isDataURI(f)){return locateFile(f)}return f}return new URL("godot_mini.wasm",import.meta.url).href}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}async function getWasmBinary(binaryFile){if(!wasmBinary){try{var response=await readAsync(binaryFile);return new Uint8Array(response)}catch{}}return getBinarySync(binaryFile)}async function instantiateArrayBuffer(binaryFile,imports){try{var binary=await getWasmBinary(binaryFile);var instance=await WebAssembly.instantiate(binary,imports);return instance}catch(reason){err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)}}async function instantiateAsync(binary,binaryFile,imports){if(!binary&&typeof WebAssembly.instantiateStreaming=="function"&&!isDataURI(binaryFile)&&!ENVIRONMENT_IS_NODE&&typeof fetch=="function"){try{var response=fetch(binaryFile,{credentials:"same-origin"});var instantiationResult=await WebAssembly.instantiateStreaming(response,imports);return instantiationResult}catch(reason){err(`wasm streaming compile failed: ${reason}`);err("falling back to ArrayBuffer instantiation")}}return instantiateArrayBuffer(binaryFile,imports)}function getWasmImports(){return{a:wasmImports}}async function createWasm(){function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["qa"];updateMemoryViews();wasmTable=wasmExports["sa"];addOnInit(wasmExports["ra"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}var info=getWasmImports();if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);readyPromiseReject(e)}}wasmBinaryFile??=findWasmBinary();try{var result=await instantiateAsync(wasmBinary,wasmBinaryFile,info);receiveInstantiationResult(result);return result}catch(e){readyPromiseReject(e);return}}class ExitStatus{name="ExitStatus";constructor(status){this.message=`Program terminated with exit(${status})`;this.status=status}}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var stackRestore=val=>__emscripten_stack_restore(val);var stackSave=()=>_emscripten_stack_get_current();var exceptionCaught=[];var uncaughtExceptionCount=0;var ___cxa_begin_catch=ptr=>{var info=new ExceptionInfo(ptr);if(!info.get_caught()){info.set_caught(true);uncaughtExceptionCount--}info.set_rethrown(false);exceptionCaught.push(info);___cxa_increment_exception_refcount(ptr);return ___cxa_get_exception_ptr(ptr)};var exceptionLast=0;var ___cxa_end_catch=()=>{_setThrew(0,0);var info=exceptionCaught.pop();___cxa_decrement_exception_refcount(info.excPtr);exceptionLast=0};class ExceptionInfo{constructor(excPtr){this.excPtr=excPtr;this.ptr=excPtr-24}set_type(type){HEAPU32[this.ptr+4>>2]=type}get_type(){return HEAPU32[this.ptr+4>>2]}set_destructor(destructor){HEAPU32[this.ptr+8>>2]=destructor}get_destructor(){return HEAPU32[this.ptr+8>>2]}set_caught(caught){caught=caught?1:0;HEAP8[this.ptr+12]=caught}get_caught(){return HEAP8[this.ptr+12]!=0}set_rethrown(rethrown){rethrown=rethrown?1:0;HEAP8[this.ptr+13]=rethrown}get_rethrown(){return HEAP8[this.ptr+13]!=0}init(type,destructor){this.set_adjusted_ptr(0);this.set_type(type);this.set_destructor(destructor)}set_adjusted_ptr(adjustedPtr){HEAPU32[this.ptr+16>>2]=adjustedPtr}get_adjusted_ptr(){return HEAPU32[this.ptr+16>>2]}}var ___resumeException=ptr=>{if(!exceptionLast){exceptionLast=ptr}throw exceptionLast};var setTempRet0=val=>__emscripten_tempret_set(val);var findMatchingCatch=args=>{var thrown=exceptionLast;if(!thrown){setTempRet0(0);return 0}var info=new ExceptionInfo(thrown);info.set_adjusted_ptr(thrown);var thrownType=info.get_type();if(!thrownType){setTempRet0(0);return thrown}for(var caughtType of args){if(caughtType===0||caughtType===thrownType){break}var adjusted_ptr_addr=info.ptr+16;if(___cxa_can_catch(caughtType,thrownType,adjusted_ptr_addr)){setTempRet0(caughtType);return thrown}}setTempRet0(thrownType);return thrown};var ___cxa_find_matching_catch_2=()=>findMatchingCatch([]);var ___cxa_find_matching_catch_3=arg0=>findMatchingCatch([arg0]);var ___cxa_find_matching_catch_4=(arg0,arg1)=>findMatchingCatch([arg0,arg1]);var ___cxa_rethrow=()=>{var info=exceptionCaught.pop();if(!info){abort("no exception to throw")}var ptr=info.excPtr;if(!info.get_rethrown()){exceptionCaught.push(info);info.set_rethrown(true);info.set_caught(false);uncaughtExceptionCount++}exceptionLast=ptr;throw exceptionLast};var ___cxa_throw=(ptr,type,destructor)=>{var info=new ExceptionInfo(ptr);info.init(type,destructor);exceptionLast=ptr;uncaughtExceptionCount++;throw exceptionLast};var __abort_js=()=>abort("");var __embind_register_bigint=(primitiveType,name,size,minRange,maxRange)=>{};var embind_init_charCodes=()=>{var codes=new Array(256);for(var i=0;i<256;++i){codes[i]=String.fromCharCode(i)}embind_charCodes=codes};var embind_charCodes;var readLatin1String=ptr=>{var ret="";var c=ptr;while(HEAPU8[c]){ret+=embind_charCodes[HEAPU8[c++]]}return ret};var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var BindingError;var throwBindingError=message=>{throw new BindingError(message)};var InternalError;var throwInternalError=message=>{throw new InternalError(message)};var whenDependentTypesAreResolved=(myTypes,dependentTypes,getTypeConverters)=>{myTypes.forEach(type=>typeDependencies[type]=dependentTypes);function onComplete(typeConverters){var myTypeConverters=getTypeConverters(typeConverters);if(myTypeConverters.length!==myTypes.length){throwInternalError("Mismatched type converter count")}for(var i=0;i<myTypes.length;++i){registerType(myTypes[i],myTypeConverters[i])}}var typeConverters=new Array(dependentTypes.length);var unregisteredTypes=[];var registered=0;dependentTypes.forEach((dt,i)=>{if(registeredTypes.hasOwnProperty(dt)){typeConverters[i]=registeredTypes[dt]}else{unregisteredTypes.push(dt);if(!awaitingDependencies.hasOwnProperty(dt)){awaitingDependencies[dt]=[]}awaitingDependencies[dt].push(()=>{typeConverters[i]=registeredTypes[dt];++registered;if(registered===unregisteredTypes.length){onComplete(typeConverters)}})}});if(0===unregisteredTypes.length){onComplete(typeConverters)}};function sharedRegisterType(rawType,registeredInstance,options={}){var name=registeredInstance.name;if(!rawType){throwBindingError(`type "${name}" must have a positive integer typeid pointer`)}if(registeredTypes.hasOwnProperty(rawType)){if(options.ignoreDuplicateRegistrations){return}else{throwBindingError(`Cannot register type '${name}' twice`)}}registeredTypes[rawType]=registeredInstance;delete typeDependencies[rawType];if(awaitingDependencies.hasOwnProperty(rawType)){var callbacks=awaitingDependencies[rawType];delete awaitingDependencies[rawType];callbacks.forEach(cb=>cb())}}function registerType(rawType,registeredInstance,options={}){return sharedRegisterType(rawType,registeredInstance,options)}var GenericWireTypeSize=8;var __embind_register_bool=(rawType,name,trueValue,falseValue)=>{name=readLatin1String(name);registerType(rawType,{name,fromWireType:function(wt){return!!wt},toWireType:function(destructors,o){return o?trueValue:falseValue},argPackAdvance:GenericWireTypeSize,readValueFromPointer:function(pointer){return this["fromWireType"](HEAPU8[pointer])},destructorFunction:null})};var shallowCopyInternalPointer=o=>({count:o.count,deleteScheduled:o.deleteScheduled,preservePointerOnDelete:o.preservePointerOnDelete,ptr:o.ptr,ptrType:o.ptrType,smartPtr:o.smartPtr,smartPtrType:o.smartPtrType});var throwInstanceAlreadyDeleted=obj=>{function getInstanceTypeName(handle){return handle.$$.ptrType.registeredClass.name}throwBindingError(getInstanceTypeName(obj)+" instance already deleted")};var finalizationRegistry=false;var detachFinalizer=handle=>{};var runDestructor=$$=>{if($$.smartPtr){$$.smartPtrType.rawDestructor($$.smartPtr)}else{$$.ptrType.registeredClass.rawDestructor($$.ptr)}};var releaseClassHandle=$$=>{$$.count.value-=1;var toDelete=0===$$.count.value;if(toDelete){runDestructor($$)}};var downcastPointer=(ptr,ptrClass,desiredClass)=>{if(ptrClass===desiredClass){return ptr}if(undefined===desiredClass.baseClass){return null}var rv=downcastPointer(ptr,ptrClass,desiredClass.baseClass);if(rv===null){return null}return desiredClass.downcast(rv)};var registeredPointers={};var registeredInstances={};var getBasestPointer=(class_,ptr)=>{if(ptr===undefined){throwBindingError("ptr should not be undefined")}while(class_.baseClass){ptr=class_.upcast(ptr);class_=class_.baseClass}return ptr};var getInheritedInstance=(class_,ptr)=>{ptr=getBasestPointer(class_,ptr);return registeredInstances[ptr]};var makeClassHandle=(prototype,record)=>{if(!record.ptrType||!record.ptr){throwInternalError("makeClassHandle requires ptr and ptrType")}var hasSmartPtrType=!!record.smartPtrType;var hasSmartPtr=!!record.smartPtr;if(hasSmartPtrType!==hasSmartPtr){throwInternalError("Both smartPtrType and smartPtr must be specified")}record.count={value:1};return attachFinalizer(Object.create(prototype,{$$:{value:record,writable:true}}))};function RegisteredPointer_fromWireType(ptr){var rawPointer=this.getPointee(ptr);if(!rawPointer){this.destructor(ptr);return null}var registeredInstance=getInheritedInstance(this.registeredClass,rawPointer);if(undefined!==registeredInstance){if(0===registeredInstance.$$.count.value){registeredInstance.$$.ptr=rawPointer;registeredInstance.$$.smartPtr=ptr;return registeredInstance["clone"]()}else{var rv=registeredInstance["clone"]();this.destructor(ptr);return rv}}function makeDefaultHandle(){if(this.isSmartPointer){return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this.pointeeType,ptr:rawPointer,smartPtrType:this,smartPtr:ptr})}else{return makeClassHandle(this.registeredClass.instancePrototype,{ptrType:this,ptr})}}var actualType=this.registeredClass.getActualType(rawPointer);var registeredPointerRecord=registeredPointers[actualType];if(!registeredPointerRecord){return makeDefaultHandle.call(this)}var toType;if(this.isConst){toType=registeredPointerRecord.constPointerType}else{toType=registeredPointerRecord.pointerType}var dp=downcastPointer(rawPointer,this.registeredClass,toType.registeredClass);if(dp===null){return makeDefaultHandle.call(this)}if(this.isSmartPointer){return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp,smartPtrType:this,smartPtr:ptr})}else{return makeClassHandle(toType.registeredClass.instancePrototype,{ptrType:toType,ptr:dp})}}var attachFinalizer=handle=>{if("undefined"===typeof FinalizationRegistry){attachFinalizer=handle=>handle;return handle}finalizationRegistry=new FinalizationRegistry(info=>{releaseClassHandle(info.$$)});attachFinalizer=handle=>{var $$=handle.$$;var hasSmartPtr=!!$$.smartPtr;if(hasSmartPtr){var info={$$};finalizationRegistry.register(handle,info,handle)}return handle};detachFinalizer=handle=>finalizationRegistry.unregister(handle);return attachFinalizer(handle)};var deletionQueue=[];var flushPendingDeletes=()=>{while(deletionQueue.length){var obj=deletionQueue.pop();obj.$$.deleteScheduled=false;obj["delete"]()}};var delayFunction;var init_ClassHandle=()=>{Object.assign(ClassHandle.prototype,{isAliasOf(other){if(!(this instanceof ClassHandle)){return false}if(!(other instanceof ClassHandle)){return false}var leftClass=this.$$.ptrType.registeredClass;var left=this.$$.ptr;other.$$=other.$$;var rightClass=other.$$.ptrType.registeredClass;var right=other.$$.ptr;while(leftClass.baseClass){left=leftClass.upcast(left);leftClass=leftClass.baseClass}while(rightClass.baseClass){right=rightClass.upcast(right);rightClass=rightClass.baseClass}return leftClass===rightClass&&left===right},clone(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}if(this.$$.preservePointerOnDelete){this.$$.count.value+=1;return this}else{var clone=attachFinalizer(Object.create(Object.getPrototypeOf(this),{$$:{value:shallowCopyInternalPointer(this.$$)}}));clone.$$.count.value+=1;clone.$$.deleteScheduled=false;return clone}},delete(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion")}detachFinalizer(this);releaseClassHandle(this.$$);if(!this.$$.preservePointerOnDelete){this.$$.smartPtr=undefined;this.$$.ptr=undefined}},isDeleted(){return!this.$$.ptr},deleteLater(){if(!this.$$.ptr){throwInstanceAlreadyDeleted(this)}if(this.$$.deleteScheduled&&!this.$$.preservePointerOnDelete){throwBindingError("Object already scheduled for deletion")}deletionQueue.push(this);if(deletionQueue.length===1&&delayFunction){delayFunction(flushPendingDeletes)}this.$$.deleteScheduled=true;return this}})};function ClassHandle(){}var createNamedFunction=(name,body)=>Object.defineProperty(body,"name",{value:name});var ensureOverloadTable=(proto,methodName,humanName)=>{if(undefined===proto[methodName].overloadTable){var prevFunc=proto[methodName];proto[methodName]=function(...args){if(!proto[methodName].overloadTable.hasOwnProperty(args.length)){throwBindingError(`Function '${humanName}' called with an invalid number of arguments (${args.length}) - expects one of (${proto[methodName].overloadTable})!`)}return proto[methodName].overloadTable[args.length].apply(this,args)};proto[methodName].overloadTable=[];proto[methodName].overloadTable[prevFunc.argCount]=prevFunc}};var exposePublicSymbol=(name,value,numArguments)=>{if(Module.hasOwnProperty(name)){if(undefined===numArguments||undefined!==Module[name].overloadTable&&undefined!==Module[name].overloadTable[numArguments]){throwBindingError(`Cannot register public name '${name}' twice`)}ensureOverloadTable(Module,name,name);if(Module[name].overloadTable.hasOwnProperty(numArguments)){throwBindingError(`Cannot register multiple overloads of a function with the same number of arguments (${numArguments})!`)}Module[name].overloadTable[numArguments]=value}else{Module[name]=value;Module[name].argCount=numArguments}};var char_0=48;var char_9=57;var makeLegalFunctionName=name=>{name=name.replace(/[^a-zA-Z0-9_]/g,"$");var f=name.charCodeAt(0);if(f>=char_0&&f<=char_9){return`_${name}`}return name};function RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast){this.name=name;this.constructor=constructor;this.instancePrototype=instancePrototype;this.rawDestructor=rawDestructor;this.baseClass=baseClass;this.getActualType=getActualType;this.upcast=upcast;this.downcast=downcast;this.pureVirtualFunctions=[]}var upcastPointer=(ptr,ptrClass,desiredClass)=>{while(ptrClass!==desiredClass){if(!ptrClass.upcast){throwBindingError(`Expected null or instance of ${desiredClass.name}, got an instance of ${ptrClass.name}`)}ptr=ptrClass.upcast(ptr);ptrClass=ptrClass.baseClass}return ptr};function constNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError(`null is not a valid ${this.name}`)}return 0}if(!handle.$$){throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`)}if(!handle.$$.ptr){throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`)}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function genericPointerToWireType(destructors,handle){var ptr;if(handle===null){if(this.isReference){throwBindingError(`null is not a valid ${this.name}`)}if(this.isSmartPointer){ptr=this.rawConstructor();if(destructors!==null){destructors.push(this.rawDestructor,ptr)}return ptr}else{return 0}}if(!handle||!handle.$$){throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`)}if(!handle.$$.ptr){throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`)}if(!this.isConst&&handle.$$.ptrType.isConst){throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name} to parameter type ${this.name}`)}var handleClass=handle.$$.ptrType.registeredClass;ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);if(this.isSmartPointer){if(undefined===handle.$$.smartPtr){throwBindingError("Passing raw pointer to smart pointer is illegal")}switch(this.sharingPolicy){case 0:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr}else{throwBindingError(`Cannot convert argument of type ${handle.$$.smartPtrType?handle.$$.smartPtrType.name:handle.$$.ptrType.name} to parameter type ${this.name}`)}break;case 1:ptr=handle.$$.smartPtr;break;case 2:if(handle.$$.smartPtrType===this){ptr=handle.$$.smartPtr}else{var clonedHandle=handle["clone"]();ptr=this.rawShare(ptr,Emval.toHandle(()=>clonedHandle["delete"]()));if(destructors!==null){destructors.push(this.rawDestructor,ptr)}}break;default:throwBindingError("Unsupporting sharing policy")}}return ptr}function nonConstNoSmartPtrRawPointerToWireType(destructors,handle){if(handle===null){if(this.isReference){throwBindingError(`null is not a valid ${this.name}`)}return 0}if(!handle.$$){throwBindingError(`Cannot pass "${embindRepr(handle)}" as a ${this.name}`)}if(!handle.$$.ptr){throwBindingError(`Cannot pass deleted object as a pointer of type ${this.name}`)}if(handle.$$.ptrType.isConst){throwBindingError(`Cannot convert argument of type ${handle.$$.ptrType.name} to parameter type ${this.name}`)}var handleClass=handle.$$.ptrType.registeredClass;var ptr=upcastPointer(handle.$$.ptr,handleClass,this.registeredClass);return ptr}function readPointer(pointer){return this["fromWireType"](HEAPU32[pointer>>2])}var init_RegisteredPointer=()=>{Object.assign(RegisteredPointer.prototype,{getPointee(ptr){if(this.rawGetPointee){ptr=this.rawGetPointee(ptr)}return ptr},destructor(ptr){this.rawDestructor?.(ptr)},argPackAdvance:GenericWireTypeSize,readValueFromPointer:readPointer,fromWireType:RegisteredPointer_fromWireType})};function RegisteredPointer(name,registeredClass,isReference,isConst,isSmartPointer,pointeeType,sharingPolicy,rawGetPointee,rawConstructor,rawShare,rawDestructor){this.name=name;this.registeredClass=registeredClass;this.isReference=isReference;this.isConst=isConst;this.isSmartPointer=isSmartPointer;this.pointeeType=pointeeType;this.sharingPolicy=sharingPolicy;this.rawGetPointee=rawGetPointee;this.rawConstructor=rawConstructor;this.rawShare=rawShare;this.rawDestructor=rawDestructor;if(!isSmartPointer&&registeredClass.baseClass===undefined){if(isConst){this["toWireType"]=constNoSmartPtrRawPointerToWireType;this.destructorFunction=null}else{this["toWireType"]=nonConstNoSmartPtrRawPointerToWireType;this.destructorFunction=null}}else{this["toWireType"]=genericPointerToWireType}}var replacePublicSymbol=(name,value,numArguments)=>{if(!Module.hasOwnProperty(name)){throwInternalError("Replacing nonexistent public symbol")}if(undefined!==Module[name].overloadTable&&undefined!==numArguments){Module[name].overloadTable[numArguments]=value}else{Module[name]=value;Module[name].argCount=numArguments}};var dynCallLegacy=(sig,ptr,args)=>{sig=sig.replace(/p/g,"i");var f=Module["dynCall_"+sig];return f(ptr,...args)};var wasmTable;var getWasmTableEntry=funcPtr=>wasmTable.get(funcPtr);var dynCall=(sig,ptr,args=[])=>{if(sig.includes("j")){return dynCallLegacy(sig,ptr,args)}var rtn=getWasmTableEntry(ptr)(...args);return rtn};var getDynCaller=(sig,ptr)=>(...args)=>dynCall(sig,ptr,args);var embind__requireFunction=(signature,rawFunction)=>{signature=readLatin1String(signature);function makeDynCaller(){if(signature.includes("j")){return getDynCaller(signature,rawFunction)}return getWasmTableEntry(rawFunction)}var fp=makeDynCaller();if(typeof fp!="function"){throwBindingError(`unknown function pointer with signature ${signature}: ${rawFunction}`)}return fp};var extendError=(baseErrorType,errorName)=>{var errorClass=createNamedFunction(errorName,function(message){this.name=errorName;this.message=message;var stack=new Error(message).stack;if(stack!==undefined){this.stack=this.toString()+"\n"+stack.replace(/^Error(:[^\n]*)?\n/,"")}});errorClass.prototype=Object.create(baseErrorType.prototype);errorClass.prototype.constructor=errorClass;errorClass.prototype.toString=function(){if(this.message===undefined){return this.name}else{return`${this.name}: ${this.message}`}};return errorClass};var UnboundTypeError;var getTypeName=type=>{var ptr=___getTypeName(type);var rv=readLatin1String(ptr);_free(ptr);return rv};var throwUnboundTypeError=(message,types)=>{var unboundTypes=[];var seen={};function visit(type){if(seen[type]){return}if(registeredTypes[type]){return}if(typeDependencies[type]){typeDependencies[type].forEach(visit);return}unboundTypes.push(type);seen[type]=true}types.forEach(visit);throw new UnboundTypeError(`${message}: `+unboundTypes.map(getTypeName).join([", "]))};var __embind_register_class=(rawType,rawPointerType,rawConstPointerType,baseClassRawType,getActualTypeSignature,getActualType,upcastSignature,upcast,downcastSignature,downcast,name,destructorSignature,rawDestructor)=>{name=readLatin1String(name);getActualType=embind__requireFunction(getActualTypeSignature,getActualType);upcast&&=embind__requireFunction(upcastSignature,upcast);downcast&&=embind__requireFunction(downcastSignature,downcast);rawDestructor=embind__requireFunction(destructorSignature,rawDestructor);var legalFunctionName=makeLegalFunctionName(name);exposePublicSymbol(legalFunctionName,function(){throwUnboundTypeError(`Cannot construct ${name} due to unbound types`,[baseClassRawType])});whenDependentTypesAreResolved([rawType,rawPointerType,rawConstPointerType],baseClassRawType?[baseClassRawType]:[],base=>{base=base[0];var baseClass;var basePrototype;if(baseClassRawType){baseClass=base.registeredClass;basePrototype=baseClass.instancePrototype}else{basePrototype=ClassHandle.prototype}var constructor=createNamedFunction(name,function(...args){if(Object.getPrototypeOf(this)!==instancePrototype){throw new BindingError("Use 'new' to construct "+name)}if(undefined===registeredClass.constructor_body){throw new BindingError(name+" has no accessible constructor")}var body=registeredClass.constructor_body[args.length];if(undefined===body){throw new BindingError(`Tried to invoke ctor of ${name} with invalid number of parameters (${args.length}) - expected (${Object.keys(registeredClass.constructor_body).toString()}) parameters instead!`)}return body.apply(this,args)});var instancePrototype=Object.create(basePrototype,{constructor:{value:constructor}});constructor.prototype=instancePrototype;var registeredClass=new RegisteredClass(name,constructor,instancePrototype,rawDestructor,baseClass,getActualType,upcast,downcast);if(registeredClass.baseClass){registeredClass.baseClass.__derivedClasses??=[];registeredClass.baseClass.__derivedClasses.push(registeredClass)}var referenceConverter=new RegisteredPointer(name,registeredClass,true,false,false);var pointerConverter=new RegisteredPointer(name+"*",registeredClass,false,false,false);var constPointerConverter=new RegisteredPointer(name+" const*",registeredClass,false,true,false);registeredPointers[rawType]={pointerType:pointerConverter,constPointerType:constPointerConverter};replacePublicSymbol(legalFunctionName,constructor);return[referenceConverter,pointerConverter,constPointerConverter]})};var heap32VectorToArray=(count,firstElement)=>{var array=[];for(var i=0;i<count;i++){array.push(HEAPU32[firstElement+i*4>>2])}return array};var runDestructors=destructors=>{while(destructors.length){var ptr=destructors.pop();var del=destructors.pop();del(ptr)}};function usesDestructorStack(argTypes){for(var i=1;i<argTypes.length;++i){if(argTypes[i]!==null&&argTypes[i].destructorFunction===undefined){return true}}return false}function newFunc(constructor,argumentList){if(!(constructor instanceof Function)){throw new TypeError(`new_ called with constructor type ${typeof constructor} which is not a function`)}var dummy=createNamedFunction(constructor.name||"unknownFunctionName",function(){});dummy.prototype=constructor.prototype;var obj=new dummy;var r=constructor.apply(obj,argumentList);return r instanceof Object?r:obj}function createJsInvoker(argTypes,isClassMethodFunc,returns,isAsync){var needsDestructorStack=usesDestructorStack(argTypes);var argCount=argTypes.length-2;var argsList=[];var argsListWired=["fn"];if(isClassMethodFunc){argsListWired.push("thisWired")}for(var i=0;i<argCount;++i){argsList.push(`arg${i}`);argsListWired.push(`arg${i}Wired`)}argsList=argsList.join(",");argsListWired=argsListWired.join(",");var invokerFnBody=`return function (${argsList}) {\n`;if(needsDestructorStack){invokerFnBody+="var destructors = [];\n"}var dtorStack=needsDestructorStack?"destructors":"null";var args1=["humanName","throwBindingError","invoker","fn","runDestructors","retType","classParam"];if(isClassMethodFunc){invokerFnBody+=`var thisWired = classParam['toWireType'](${dtorStack}, this);\n`}for(var i=0;i<argCount;++i){invokerFnBody+=`var arg${i}Wired = argType${i}['toWireType'](${dtorStack}, arg${i});\n`;args1.push(`argType${i}`)}invokerFnBody+=(returns||isAsync?"var rv = ":"")+`invoker(${argsListWired});\n`;if(needsDestructorStack){invokerFnBody+="runDestructors(destructors);\n"}else{for(var i=isClassMethodFunc?1:2;i<argTypes.length;++i){var paramName=i===1?"thisWired":"arg"+(i-2)+"Wired";if(argTypes[i].destructorFunction!==null){invokerFnBody+=`${paramName}_dtor(${paramName});\n`;args1.push(`${paramName}_dtor`)}}}if(returns){invokerFnBody+="var ret = retType['fromWireType'](rv);\n"+"return ret;\n"}else{}invokerFnBody+="}\n";return[args1,invokerFnBody]}function craftInvokerFunction(humanName,argTypes,classType,cppInvokerFunc,cppTargetFunc,isAsync){var argCount=argTypes.length;if(argCount<2){throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!")}var isClassMethodFunc=argTypes[1]!==null&&classType!==null;var needsDestructorStack=usesDestructorStack(argTypes);var returns=argTypes[0].name!=="void";var closureArgs=[humanName,throwBindingError,cppInvokerFunc,cppTargetFunc,runDestructors,argTypes[0],argTypes[1]];for(var i=0;i<argCount-2;++i){closureArgs.push(argTypes[i+2])}if(!needsDestructorStack){for(var i=isClassMethodFunc?1:2;i<argTypes.length;++i){if(argTypes[i].destructorFunction!==null){closureArgs.push(argTypes[i].destructorFunction)}}}let[args,invokerFnBody]=createJsInvoker(argTypes,isClassMethodFunc,returns,isAsync);args.push(invokerFnBody);var invokerFn=newFunc(Function,args)(...closureArgs);return createNamedFunction(humanName,invokerFn)}var __embind_register_class_constructor=(rawClassType,argCount,rawArgTypesAddr,invokerSignature,invoker,rawConstructor)=>{var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);invoker=embind__requireFunction(invokerSignature,invoker);whenDependentTypesAreResolved([],[rawClassType],classType=>{classType=classType[0];var humanName=`constructor ${classType.name}`;if(undefined===classType.registeredClass.constructor_body){classType.registeredClass.constructor_body=[]}if(undefined!==classType.registeredClass.constructor_body[argCount-1]){throw new BindingError(`Cannot register multiple constructors with identical number of parameters (${argCount-1}) for class '${classType.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`)}classType.registeredClass.constructor_body[argCount-1]=()=>{throwUnboundTypeError(`Cannot construct ${classType.name} due to unbound types`,rawArgTypes)};whenDependentTypesAreResolved([],rawArgTypes,argTypes=>{argTypes.splice(1,0,null);classType.registeredClass.constructor_body[argCount-1]=craftInvokerFunction(humanName,argTypes,null,invoker,rawConstructor);return[]});return[]})};var getFunctionName=signature=>{signature=signature.trim();const argsIndex=signature.indexOf("(");if(argsIndex!==-1){return signature.substr(0,argsIndex)}else{return signature}};var __embind_register_class_function=(rawClassType,methodName,argCount,rawArgTypesAddr,invokerSignature,rawInvoker,context,isPureVirtual,isAsync,isNonnullReturn)=>{var rawArgTypes=heap32VectorToArray(argCount,rawArgTypesAddr);methodName=readLatin1String(methodName);methodName=getFunctionName(methodName);rawInvoker=embind__requireFunction(invokerSignature,rawInvoker);whenDependentTypesAreResolved([],[rawClassType],classType=>{classType=classType[0];var humanName=`${classType.name}.${methodName}`;if(methodName.startsWith("@@")){methodName=Symbol[methodName.substring(2)]}if(isPureVirtual){classType.registeredClass.pureVirtualFunctions.push(methodName)}function unboundTypesHandler(){throwUnboundTypeError(`Cannot call ${humanName} due to unbound types`,rawArgTypes)}var proto=classType.registeredClass.instancePrototype;var method=proto[methodName];if(undefined===method||undefined===method.overloadTable&&method.className!==classType.name&&method.argCount===argCount-2){unboundTypesHandler.argCount=argCount-2;unboundTypesHandler.className=classType.name;proto[methodName]=unboundTypesHandler}else{ensureOverloadTable(proto,methodName,humanName);proto[methodName].overloadTable[argCount-2]=unboundTypesHandler}whenDependentTypesAreResolved([],rawArgTypes,argTypes=>{var memberFunction=craftInvokerFunction(humanName,argTypes,classType,rawInvoker,context,isAsync);if(undefined===proto[methodName].overloadTable){memberFunction.argCount=argCount-2;proto[methodName]=memberFunction}else{proto[methodName].overloadTable[argCount-2]=memberFunction}return[]});return[]})};var validateThis=(this_,classType,humanName)=>{if(!(this_ instanceof Object)){throwBindingError(`${humanName} with invalid "this": ${this_}`)}if(!(this_ instanceof classType.registeredClass.constructor)){throwBindingError(`${humanName} incompatible with "this" of type ${this_.constructor.name}`)}if(!this_.$$.ptr){throwBindingError(`cannot call emscripten binding method ${humanName} on deleted object`)}return upcastPointer(this_.$$.ptr,this_.$$.ptrType.registeredClass,classType.registeredClass)};var __embind_register_class_property=(classType,fieldName,getterReturnType,getterSignature,getter,getterContext,setterArgumentType,setterSignature,setter,setterContext)=>{fieldName=readLatin1String(fieldName);getter=embind__requireFunction(getterSignature,getter);whenDependentTypesAreResolved([],[classType],classType=>{classType=classType[0];var humanName=`${classType.name}.${fieldName}`;var desc={get(){throwUnboundTypeError(`Cannot access ${humanName} due to unbound types`,[getterReturnType,setterArgumentType])},enumerable:true,configurable:true};if(setter){desc.set=()=>throwUnboundTypeError(`Cannot access ${humanName} due to unbound types`,[getterReturnType,setterArgumentType])}else{desc.set=v=>throwBindingError(humanName+" is a read-only property")}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);whenDependentTypesAreResolved([],setter?[getterReturnType,setterArgumentType]:[getterReturnType],types=>{var getterReturnType=types[0];var desc={get(){var ptr=validateThis(this,classType,humanName+" getter");return getterReturnType["fromWireType"](getter(getterContext,ptr))},enumerable:true};if(setter){setter=embind__requireFunction(setterSignature,setter);var setterArgumentType=types[1];desc.set=function(v){var ptr=validateThis(this,classType,humanName+" setter");var destructors=[];setter(setterContext,ptr,setterArgumentType["toWireType"](destructors,v));runDestructors(destructors)}}Object.defineProperty(classType.registeredClass.instancePrototype,fieldName,desc);return[]});return[]})};var emval_freelist=[];var emval_handles=[];var __emval_decref=handle=>{if(handle>9&&0===--emval_handles[handle+1]){emval_handles[handle]=undefined;emval_freelist.push(handle)}};var count_emval_handles=()=>emval_handles.length/2-5-emval_freelist.length;var init_emval=()=>{emval_handles.push(0,1,undefined,1,null,1,true,1,false,1);Module["count_emval_handles"]=count_emval_handles};var Emval={toValue:handle=>{if(!handle){throwBindingError("Cannot use deleted val. handle = "+handle)}return emval_handles[handle]},toHandle:value=>{switch(value){case undefined:return 2;case null:return 4;case true:return 6;case false:return 8;default:{const handle=emval_freelist.pop()||emval_handles.length;emval_handles[handle]=value;emval_handles[handle+1]=1;return handle}}}};var EmValType={name:"emscripten::val",fromWireType:handle=>{var rv=Emval.toValue(handle);__emval_decref(handle);return rv},toWireType:(destructors,value)=>Emval.toHandle(value),argPackAdvance:GenericWireTypeSize,readValueFromPointer:readPointer,destructorFunction:null};var __embind_register_emval=rawType=>registerType(rawType,EmValType);var embindRepr=v=>{if(v===null){return"null"}var t=typeof v;if(t==="object"||t==="array"||t==="function"){return v.toString()}else{return""+v}};var floatReadValueFromPointer=(name,width)=>{switch(width){case 4:return function(pointer){return this["fromWireType"](HEAPF32[pointer>>2])};case 8:return function(pointer){return this["fromWireType"](HEAPF64[pointer>>3])};default:throw new TypeError(`invalid float width (${width}): ${name}`)}};var __embind_register_float=(rawType,name,size)=>{name=readLatin1String(name);registerType(rawType,{name,fromWireType:value=>value,toWireType:(destructors,value)=>value,argPackAdvance:GenericWireTypeSize,readValueFromPointer:floatReadValueFromPointer(name,size),destructorFunction:null})};var __embind_register_function=(name,argCount,rawArgTypesAddr,signature,rawInvoker,fn,isAsync,isNonnullReturn)=>{var argTypes=heap32VectorToArray(argCount,rawArgTypesAddr);name=readLatin1String(name);name=getFunctionName(name);rawInvoker=embind__requireFunction(signature,rawInvoker);exposePublicSymbol(name,function(){throwUnboundTypeError(`Cannot call ${name} due to unbound types`,argTypes)},argCount-1);whenDependentTypesAreResolved([],argTypes,argTypes=>{var invokerArgsArray=[argTypes[0],null].concat(argTypes.slice(1));replacePublicSymbol(name,craftInvokerFunction(name,invokerArgsArray,null,rawInvoker,fn,isAsync),argCount-1);return[]})};var integerReadValueFromPointer=(name,width,signed)=>{switch(width){case 1:return signed?pointer=>HEAP8[pointer]:pointer=>HEAPU8[pointer];case 2:return signed?pointer=>HEAP16[pointer>>1]:pointer=>HEAPU16[pointer>>1];case 4:return signed?pointer=>HEAP32[pointer>>2]:pointer=>HEAPU32[pointer>>2];default:throw new TypeError(`invalid integer width (${width}): ${name}`)}};var __embind_register_integer=(primitiveType,name,size,minRange,maxRange)=>{name=readLatin1String(name);if(maxRange===-1){maxRange=4294967295}var fromWireType=value=>value;if(minRange===0){var bitshift=32-8*size;fromWireType=value=>value<<bitshift>>>bitshift}var isUnsignedType=name.includes("unsigned");var checkAssertions=(value,toTypeName)=>{};var toWireType;if(isUnsignedType){toWireType=function(destructors,value){checkAssertions(value,this.name);return value>>>0}}else{toWireType=function(destructors,value){checkAssertions(value,this.name);return value}}registerType(primitiveType,{name,fromWireType,toWireType,argPackAdvance:GenericWireTypeSize,readValueFromPointer:integerReadValueFromPointer(name,size,minRange!==0),destructorFunction:null})};var __embind_register_memory_view=(rawType,dataTypeIndex,name)=>{var typeMapping=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];var TA=typeMapping[dataTypeIndex];function decodeMemoryView(handle){var size=HEAPU32[handle>>2];var data=HEAPU32[handle+4>>2];return new TA(HEAP8.buffer,data,size)}name=readLatin1String(name);registerType(rawType,{name,fromWireType:decodeMemoryView,argPackAdvance:GenericWireTypeSize,readValueFromPointer:decodeMemoryView},{ignoreDuplicateRegistrations:true})};var EmValOptionalType=Object.assign({optional:true},EmValType);var __embind_register_optional=(rawOptionalType,rawType)=>{registerType(rawOptionalType,EmValOptionalType)};var __embind_register_smart_ptr=(rawType,rawPointeeType,name,sharingPolicy,getPointeeSignature,rawGetPointee,constructorSignature,rawConstructor,shareSignature,rawShare,destructorSignature,rawDestructor)=>{name=readLatin1String(name);rawGetPointee=embind__requireFunction(getPointeeSignature,rawGetPointee);rawConstructor=embind__requireFunction(constructorSignature,rawConstructor);rawShare=embind__requireFunction(shareSignature,rawShare);rawDestructor=embind__requireFunction(destructorSignature,rawDestructor);whenDependentTypesAreResolved([rawType],[rawPointeeType],pointeeType=>{pointeeType=pointeeType[0];var registeredPointer=new RegisteredPointer(name,pointeeType.registeredClass,false,false,true,pointeeType,sharingPolicy,rawGetPointee,rawConstructor,rawShare,rawDestructor);return[registeredPointer]})};var stringToUTF8Array=(str,heap,outIdx,maxBytesToWrite)=>{if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}}heap[outIdx]=0;return outIdx-startIdx};var stringToUTF8=(str,outPtr,maxBytesToWrite)=>stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite);var lengthBytesUTF8=str=>{var len=0;for(var i=0;i<str.length;++i){var c=str.charCodeAt(i);if(c<=127){len++}else if(c<=2047){len+=2}else if(c>=55296&&c<=57343){len+=4;++i}else{len+=3}}return len};var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder:undefined;var UTF8ArrayToString=(heapOrArray,idx=0,maxBytesToRead=NaN)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var __embind_register_std_string=(rawType,name)=>{name=readLatin1String(name);var stdStringIsUTF8=true;registerType(rawType,{name,fromWireType(value){var length=HEAPU32[value>>2];var payload=value+4;var str;if(stdStringIsUTF8){var decodeStartPtr=payload;for(var i=0;i<=length;++i){var currentBytePtr=payload+i;if(i==length||HEAPU8[currentBytePtr]==0){var maxRead=currentBytePtr-decodeStartPtr;var stringSegment=UTF8ToString(decodeStartPtr,maxRead);if(str===undefined){str=stringSegment}else{str+=String.fromCharCode(0);str+=stringSegment}decodeStartPtr=currentBytePtr+1}}}else{var a=new Array(length);for(var i=0;i<length;++i){a[i]=String.fromCharCode(HEAPU8[payload+i])}str=a.join("")}_free(value);return str},toWireType(destructors,value){if(value instanceof ArrayBuffer){value=new Uint8Array(value)}var length;var valueIsOfTypeString=typeof value=="string";if(!(valueIsOfTypeString||value instanceof Uint8Array||value instanceof Uint8ClampedArray||value instanceof Int8Array)){throwBindingError("Cannot pass non-string to std::string")}if(stdStringIsUTF8&&valueIsOfTypeString){length=lengthBytesUTF8(value)}else{length=value.length}var base=_malloc(4+length+1);var ptr=base+4;HEAPU32[base>>2]=length;if(stdStringIsUTF8&&valueIsOfTypeString){stringToUTF8(value,ptr,length+1)}else{if(valueIsOfTypeString){for(var i=0;i<length;++i){var charCode=value.charCodeAt(i);if(charCode>255){_free(ptr);throwBindingError("String has UTF-16 code units that do not fit in 8 bits")}HEAPU8[ptr+i]=charCode}}else{for(var i=0;i<length;++i){HEAPU8[ptr+i]=value[i]}}}if(destructors!==null){destructors.push(_free,base)}return base},argPackAdvance:GenericWireTypeSize,readValueFromPointer:readPointer,destructorFunction(ptr){_free(ptr)}})};var UTF16Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf-16le"):undefined;var UTF16ToString=(ptr,maxBytesToRead)=>{var endPtr=ptr;var idx=endPtr>>1;var maxIdx=idx+maxBytesToRead/2;while(!(idx>=maxIdx)&&HEAPU16[idx])++idx;endPtr=idx<<1;if(endPtr-ptr>32&&UTF16Decoder)return UTF16Decoder.decode(HEAPU8.subarray(ptr,endPtr));var str="";for(var i=0;!(i>=maxBytesToRead/2);++i){var codeUnit=HEAP16[ptr+i*2>>1];if(codeUnit==0)break;str+=String.fromCharCode(codeUnit)}return str};var stringToUTF16=(str,outPtr,maxBytesToWrite)=>{maxBytesToWrite??=2147483647;if(maxBytesToWrite<2)return 0;maxBytesToWrite-=2;var startPtr=outPtr;var numCharsToWrite=maxBytesToWrite<str.length*2?maxBytesToWrite/2:str.length;for(var i=0;i<numCharsToWrite;++i){var codeUnit=str.charCodeAt(i);HEAP16[outPtr>>1]=codeUnit;outPtr+=2}HEAP16[outPtr>>1]=0;return outPtr-startPtr};var lengthBytesUTF16=str=>str.length*2;var UTF32ToString=(ptr,maxBytesToRead)=>{var i=0;var str="";while(!(i>=maxBytesToRead/4)){var utf32=HEAP32[ptr+i*4>>2];if(utf32==0)break;++i;if(utf32>=65536){var ch=utf32-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}else{str+=String.fromCharCode(utf32)}}return str};var stringToUTF32=(str,outPtr,maxBytesToWrite)=>{maxBytesToWrite??=2147483647;if(maxBytesToWrite<4)return 0;var startPtr=outPtr;var endPtr=startPtr+maxBytesToWrite-4;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343){var trailSurrogate=str.charCodeAt(++i);codeUnit=65536+((codeUnit&1023)<<10)|trailSurrogate&1023}HEAP32[outPtr>>2]=codeUnit;outPtr+=4;if(outPtr+4>endPtr)break}HEAP32[outPtr>>2]=0;return outPtr-startPtr};var lengthBytesUTF32=str=>{var len=0;for(var i=0;i<str.length;++i){var codeUnit=str.charCodeAt(i);if(codeUnit>=55296&&codeUnit<=57343)++i;len+=4}return len};var __embind_register_std_wstring=(rawType,charSize,name)=>{name=readLatin1String(name);var decodeString,encodeString,readCharAt,lengthBytesUTF;if(charSize===2){decodeString=UTF16ToString;encodeString=stringToUTF16;lengthBytesUTF=lengthBytesUTF16;readCharAt=pointer=>HEAPU16[pointer>>1]}else if(charSize===4){decodeString=UTF32ToString;encodeString=stringToUTF32;lengthBytesUTF=lengthBytesUTF32;readCharAt=pointer=>HEAPU32[pointer>>2]}registerType(rawType,{name,fromWireType:value=>{var length=HEAPU32[value>>2];var str;var decodeStartPtr=value+4;for(var i=0;i<=length;++i){var currentBytePtr=value+4+i*charSize;if(i==length||readCharAt(currentBytePtr)==0){var maxReadBytes=currentBytePtr-decodeStartPtr;var stringSegment=decodeString(decodeStartPtr,maxReadBytes);if(str===undefined){str=stringSegment}else{str+=String.fromCharCode(0);str+=stringSegment}decodeStartPtr=currentBytePtr+charSize}}_free(value);return str},toWireType:(destructors,value)=>{if(!(typeof value=="string")){throwBindingError(`Cannot pass non-string to C++ string type ${name}`)}var length=lengthBytesUTF(value);var ptr=_malloc(4+length+charSize);HEAPU32[ptr>>2]=length/charSize;encodeString(value,ptr+4,length+charSize);if(destructors!==null){destructors.push(_free,ptr)}return ptr},argPackAdvance:GenericWireTypeSize,readValueFromPointer:readPointer,destructorFunction(ptr){_free(ptr)}})};var __embind_register_void=(rawType,name)=>{name=readLatin1String(name);registerType(rawType,{isVoid:true,name,argPackAdvance:0,fromWireType:()=>undefined,toWireType:(destructors,o)=>undefined})};var requireRegisteredType=(rawType,humanName)=>{var impl=registeredTypes[rawType];if(undefined===impl){throwBindingError(`${humanName} has unknown type ${getTypeName(rawType)}`)}return impl};var emval_returnValue=(returnType,destructorsRef,handle)=>{var destructors=[];var result=returnType["toWireType"](destructors,handle);if(destructors.length){HEAPU32[destructorsRef>>2]=Emval.toHandle(destructors)}return result};var __emval_as=(handle,returnType,destructorsRef)=>{handle=Emval.toValue(handle);returnType=requireRegisteredType(returnType,"emval::as");return emval_returnValue(returnType,destructorsRef,handle)};var __emval_as_int64=(handle,returnType)=>{handle=Emval.toValue(handle);returnType=requireRegisteredType(returnType,"emval::as");return returnType["toWireType"](null,handle)};var emval_methodCallers=[];var __emval_call=(caller,handle,destructorsRef,args)=>{caller=emval_methodCallers[caller];handle=Emval.toValue(handle);return caller(null,handle,destructorsRef,args)};var emval_symbols={};var getStringOrSymbol=address=>{var symbol=emval_symbols[address];if(symbol===undefined){return readLatin1String(address)}return symbol};var __emval_call_method=(caller,objHandle,methodName,destructorsRef,args)=>{caller=emval_methodCallers[caller];objHandle=Emval.toValue(objHandle);methodName=getStringOrSymbol(methodName);return caller(objHandle,objHandle[methodName],destructorsRef,args)};var emval_get_global=()=>{if(typeof globalThis=="object"){return globalThis}return function(){return Function}()("return this")()};var __emval_get_global=name=>{if(name===0){return Emval.toHandle(emval_get_global())}else{name=getStringOrSymbol(name);return Emval.toHandle(emval_get_global()[name])}};var emval_addMethodCaller=caller=>{var id=emval_methodCallers.length;emval_methodCallers.push(caller);return id};var emval_lookupTypes=(argCount,argTypes)=>{var a=new Array(argCount);for(var i=0;i<argCount;++i){a[i]=requireRegisteredType(HEAPU32[argTypes+i*4>>2],"parameter "+i)}return a};var reflectConstruct=Reflect.construct;var __emval_get_method_caller=(argCount,argTypes,kind)=>{var types=emval_lookupTypes(argCount,argTypes);var retType=types.shift();argCount--;var functionBody=`return function (obj, func, destructorsRef, args) {\n`;var offset=0;var argsList=[];if(kind===0){argsList.push("obj")}var params=["retType"];var args=[retType];for(var i=0;i<argCount;++i){argsList.push("arg"+i);params.push("argType"+i);args.push(types[i]);functionBody+=`  var arg${i} = argType${i}.readValueFromPointer(args${offset?"+"+offset:""});\n`;offset+=types[i].argPackAdvance}var invoker=kind===1?"new func":"func.call";functionBody+=`  var rv = ${invoker}(${argsList.join(", ")});\n`;if(!retType.isVoid){params.push("emval_returnValue");args.push(emval_returnValue);functionBody+="  return emval_returnValue(retType, destructorsRef, rv);\n"}functionBody+="};\n";params.push(functionBody);var invokerFunction=newFunc(Function,params)(...args);var functionName=`methodCaller<(${types.map(t=>t.name).join(", ")}) => ${retType.name}>`;return emval_addMethodCaller(createNamedFunction(functionName,invokerFunction))};var __emval_get_property=(handle,key)=>{handle=Emval.toValue(handle);key=Emval.toValue(key);return Emval.toHandle(handle[key])};var __emval_incref=handle=>{if(handle>9){emval_handles[handle+1]+=1}};var __emval_new_array=()=>Emval.toHandle([]);var __emval_new_cstring=v=>Emval.toHandle(getStringOrSymbol(v));var __emval_new_object=()=>Emval.toHandle({});var __emval_run_destructors=handle=>{var destructors=Emval.toValue(handle);runDestructors(destructors);__emval_decref(handle)};var __emval_set_property=(handle,key,value)=>{handle=Emval.toValue(handle);key=Emval.toValue(key);value=Emval.toValue(value);handle[key]=value};var __emval_take_value=(type,arg)=>{type=requireRegisteredType(type,"_emval_take_value");var v=type["readValueFromPointer"](arg);return Emval.toHandle(v)};var __emval_typeof=handle=>{handle=Emval.toValue(handle);return Emval.toHandle(typeof handle)};var getHeapMax=()=>2147483648;var alignMemory=(size,alignment)=>Math.ceil(size/alignment)*alignment;var growMemory=size=>{var b=wasmMemory.buffer;var pages=(size-b.byteLength+65535)/65536|0;try{wasmMemory.grow(pages);updateMemoryViews();return 1}catch(e){}};var _emscripten_resize_heap=requestedSize=>{var oldSize=HEAPU8.length;requestedSize>>>=0;var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize){return false}for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignMemory(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=growMemory(newSize);if(replacement){return true}}return false};var _llvm_eh_typeid_for=type=>type;var initRandomFill=()=>{if(typeof crypto=="object"&&typeof crypto["getRandomValues"]=="function"){return view=>crypto.getRandomValues(view)}else if(ENVIRONMENT_IS_NODE){try{var crypto_module=require("crypto");var randomFillSync=crypto_module["randomFillSync"];if(randomFillSync){return view=>crypto_module["randomFillSync"](view)}var randomBytes=crypto_module["randomBytes"];return view=>(view.set(randomBytes(view.byteLength)),view)}catch(e){}}abort("initRandomDevice")};var randomFill=view=>(randomFill=initRandomFill())(view);var _random_get=(buffer,size)=>{randomFill(HEAPU8.subarray(buffer,buffer+size));return 0};var stackAlloc=sz=>__emscripten_stack_alloc(sz);var getExceptionMessageCommon=ptr=>{var sp=stackSave();var type_addr_addr=stackAlloc(4);var message_addr_addr=stackAlloc(4);___get_exception_message(ptr,type_addr_addr,message_addr_addr);var type_addr=HEAPU32[type_addr_addr>>2];var message_addr=HEAPU32[message_addr_addr>>2];var type=UTF8ToString(type_addr);_free(type_addr);var message;if(message_addr){message=UTF8ToString(message_addr);_free(message_addr)}stackRestore(sp);return[type,message]};var getExceptionMessage=ptr=>getExceptionMessageCommon(ptr);embind_init_charCodes();BindingError=Module["BindingError"]=class BindingError extends Error{constructor(message){super(message);this.name="BindingError"}};InternalError=Module["InternalError"]=class InternalError extends Error{constructor(message){super(message);this.name="InternalError"}};init_ClassHandle();init_RegisteredPointer();UnboundTypeError=Module["UnboundTypeError"]=extendError(Error,"UnboundTypeError");init_emval();var wasmImports={q:___cxa_begin_catch,B:___cxa_end_catch,a:___cxa_find_matching_catch_2,i:___cxa_find_matching_catch_3,P:___cxa_find_matching_catch_4,na:___cxa_rethrow,s:___cxa_throw,e:___resumeException,Z:__abort_js,R:__embind_register_bigint,ca:__embind_register_bool,v:__embind_register_class,D:__embind_register_class_constructor,l:__embind_register_class_function,E:__embind_register_class_property,aa:__embind_register_emval,L:__embind_register_float,z:__embind_register_function,t:__embind_register_integer,p:__embind_register_memory_view,J:__embind_register_optional,F:__embind_register_smart_ptr,ba:__embind_register_std_string,I:__embind_register_std_wstring,da:__embind_register_void,G:__emval_as,T:__emval_as_int64,C:__emval_call,H:__emval_call_method,la:__emval_decref,ma:__emval_get_global,x:__emval_get_method_caller,ga:__emval_get_property,O:__emval_incref,ka:__emval_new_array,ea:__emval_new_cstring,ia:__emval_new_object,ja:__emval_run_destructors,ha:__emval_set_property,w:__emval_take_value,fa:__emval_typeof,$:_emscripten_resize_heap,N:invoke_di,y:invoke_dii,M:invoke_diii,n:invoke_i,h:invoke_ii,b:invoke_iii,k:invoke_iiii,f:invoke_iiiii,Q:invoke_iiiiii,W:invoke_iij,U:invoke_ji,V:invoke_jiii,S:invoke_jiiii,o:invoke_v,g:invoke_vi,m:invoke_vid,d:invoke_vii,u:invoke_viid,c:invoke_viii,oa:invoke_viiidi,j:invoke_viiii,pa:invoke_viiiidi,r:invoke_viiiii,K:invoke_viiiiii,Y:invoke_viij,X:invoke_vij,A:_llvm_eh_typeid_for,_:_random_get};var wasmExports;createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["ra"])();var _malloc=a0=>(_malloc=wasmExports["ta"])(a0);var ___getTypeName=a0=>(___getTypeName=wasmExports["ua"])(a0);var _free=a0=>(_free=wasmExports["va"])(a0);var _setThrew=(a0,a1)=>(_setThrew=wasmExports["wa"])(a0,a1);var __emscripten_tempret_set=a0=>(__emscripten_tempret_set=wasmExports["xa"])(a0);var __emscripten_stack_restore=a0=>(__emscripten_stack_restore=wasmExports["ya"])(a0);var __emscripten_stack_alloc=a0=>(__emscripten_stack_alloc=wasmExports["za"])(a0);var _emscripten_stack_get_current=()=>(_emscripten_stack_get_current=wasmExports["Aa"])();var ___cxa_increment_exception_refcount=a0=>(___cxa_increment_exception_refcount=wasmExports["Ba"])(a0);var ___cxa_decrement_exception_refcount=a0=>(___cxa_decrement_exception_refcount=wasmExports["Ca"])(a0);var ___get_exception_message=(a0,a1,a2)=>(___get_exception_message=wasmExports["Da"])(a0,a1,a2);var ___cxa_can_catch=(a0,a1,a2)=>(___cxa_can_catch=wasmExports["Ea"])(a0,a1,a2);var ___cxa_get_exception_ptr=a0=>(___cxa_get_exception_ptr=wasmExports["Fa"])(a0);var dynCall_viij=Module["dynCall_viij"]=(a0,a1,a2,a3,a4)=>(dynCall_viij=Module["dynCall_viij"]=wasmExports["Ga"])(a0,a1,a2,a3,a4);var dynCall_vij=Module["dynCall_vij"]=(a0,a1,a2,a3)=>(dynCall_vij=Module["dynCall_vij"]=wasmExports["Ha"])(a0,a1,a2,a3);var dynCall_iij=Module["dynCall_iij"]=(a0,a1,a2,a3)=>(dynCall_iij=Module["dynCall_iij"]=wasmExports["Ia"])(a0,a1,a2,a3);var dynCall_jiii=Module["dynCall_jiii"]=(a0,a1,a2,a3)=>(dynCall_jiii=Module["dynCall_jiii"]=wasmExports["Ja"])(a0,a1,a2,a3);var dynCall_ji=Module["dynCall_ji"]=(a0,a1)=>(dynCall_ji=Module["dynCall_ji"]=wasmExports["Ka"])(a0,a1);var dynCall_jiiii=Module["dynCall_jiiii"]=(a0,a1,a2,a3,a4)=>(dynCall_jiiii=Module["dynCall_jiiii"]=wasmExports["La"])(a0,a1,a2,a3,a4);function invoke_viiii(index,a1,a2,a3,a4){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vii(index,a1,a2){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiii(index,a1,a2,a3,a4){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iii(index,a1,a2){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viii(index,a1,a2,a3){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vid(index,a1,a2){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiii(index,a1,a2,a3){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vi(index,a1){var sp=stackSave();try{getWasmTableEntry(index)(a1)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiidi(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiidi(index,a1,a2,a3,a4,a5){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iiiiii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_ii(index,a1){var sp=stackSave();try{return getWasmTableEntry(index)(a1)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viid(index,a1,a2,a3){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiii(index,a1,a2,a3,a4,a5){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3,a4,a5)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_v(index){var sp=stackSave();try{getWasmTableEntry(index)()}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_dii(index,a1,a2){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_i(index){var sp=stackSave();try{return getWasmTableEntry(index)()}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6){var sp=stackSave();try{getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_di(index,a1){var sp=stackSave();try{return getWasmTableEntry(index)(a1)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_diii(index,a1,a2,a3){var sp=stackSave();try{return getWasmTableEntry(index)(a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_viij(index,a1,a2,a3,a4){var sp=stackSave();try{dynCall_viij(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_vij(index,a1,a2,a3){var sp=stackSave();try{dynCall_vij(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_iij(index,a1,a2,a3){var sp=stackSave();try{return dynCall_iij(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_jiii(index,a1,a2,a3){var sp=stackSave();try{return dynCall_jiii(index,a1,a2,a3)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_ji(index,a1){var sp=stackSave();try{return dynCall_ji(index,a1)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}function invoke_jiiii(index,a1,a2,a3,a4){var sp=stackSave();try{return dynCall_jiiii(index,a1,a2,a3,a4)}catch(e){stackRestore(sp);if(e!==e+0)throw e;_setThrew(1,0)}}Module["getExceptionMessage"]=getExceptionMessage;var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();readyPromiseResolve(Module);Module["onRuntimeInitialized"]?.();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(()=>{setTimeout(()=>Module["setStatus"](""),1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}run();moduleRtn=readyPromise;


  return moduleRtn;
}
);
})();

// godot-mini-wasm v0.2.0 — JS facade (concatenated after the emscripten ESM core at build time)
// Provides: GEngine.init / node factories / automatic wasm loading / Canvas2D rendering
//           + v0.2.0: simplified 2D physics, WebAudio, multi-touch support.
// This file is appended to the emscripten output; `createModule` refers to the core factory.

const CORE_FACTORY = GDMCoreFactory;

// ---- Godot KEY codes (mirror of GDScript KEY_* constants) ----
const KEY = {
  NONE: 0, SPECIAL: 4194304, ESCAPE: 4194305, TAB: 4194306, BACKTAB: 4194307,
  BACKSPACE: 4194308, ENTER: 4194309, KP_ENTER: 4194310, INSERT: 4194311,
  DELETE: 4194312, PAUSE: 4194313, PRINT: 4194314, SYSREQ: 4194315, CLEAR: 4194316,
  HOME: 4194317, END: 4194318, LEFT: 4194319, UP: 4194320, RIGHT: 4194321,
  DOWN: 4194322, PAGEUP: 4194323, PAGEDOWN: 4194324, SHIFT: 4194325, CTRL: 4194326,
  META: 4194327, ALT: 4194328, CAPSLOCK: 4194329, NUMLOCK: 4194330, SCROLLLOCK: 4194331,
  F1: 4194332, F2: 4194333, F3: 4194334, F4: 4194335, F5: 4194336, F6: 4194337,
  F7: 4194338, F8: 4194339, F9: 4194340, F10: 4194341, F11: 4194342, F12: 4194343,
  SPACE: 32,
};
// letters / digits use their ASCII code: KEY_A = 65 ... KEY_Z = 90, KEY_0 = 48 ... KEY_9 = 57
for (let i = 0; i < 26; i++) KEY[String.fromCharCode(65 + i)] = 65 + i;
for (let i = 0; i < 10; i++) KEY[String.fromCharCode(48 + i)] = 48 + i;

const MOUSE_LEFT = 1, MOUSE_RIGHT = 2, MOUSE_MIDDLE = 3;

// DOM KeyboardEvent.code → Godot keycode
const DOM_CODE_MAP = {
  ArrowLeft: KEY.LEFT, ArrowRight: KEY.RIGHT, ArrowUp: KEY.UP, ArrowDown: KEY.DOWN,
  Space: KEY.SPACE, Enter: KEY.ENTER, NumpadEnter: KEY.KP_ENTER, Escape: KEY.ESCAPE,
  Tab: KEY.TAB, Backspace: KEY.BACKSPACE, ShiftLeft: KEY.SHIFT, ShiftRight: KEY.SHIFT,
  ControlLeft: KEY.CTRL, ControlRight: KEY.CTRL, AltLeft: KEY.ALT, AltRight: KEY.ALT,
  Home: KEY.HOME, End: KEY.END, PageUp: KEY.PAGEUP, PageDown: KEY.PAGEDOWN,
  Insert: KEY.INSERT, Delete: KEY.DELETE, CapsLock: KEY.CAPSLOCK,
};
for (let i = 0; i < 26; i++) DOM_CODE_MAP['Key' + String.fromCharCode(65 + i)] = 65 + i;
for (let i = 0; i < 10; i++) DOM_CODE_MAP['Digit' + i] = 48 + i;
for (let i = 1; i <= 12; i++) DOM_CODE_MAP['F' + i] = KEY['F' + i];

const VERSION = '0.2.0';

// ---- C++ exception → JS Error normalization (embind crosses raw pointers) ----
function patchErrorDecoding(core) {
  const decode = (e) => {
    // embind rethrows unknown C++ exceptions as `new Error(<thrown-ptr>)`
    const rawPtr = e instanceof Error && /^\d+$/.test(e.message) ? Number(e.message)
      : (typeof e === 'number' ? e : null);
    if (rawPtr !== null && typeof core.getExceptionMessage === 'function') {
      try {
        // returns [typeName, message] — prefer the message
        const r = core.getExceptionMessage(rawPtr);
        let msg = Array.isArray(r) ? (r[1] && r[1].length ? r[1] : r[0]) : String(r);
        msg = msg.replace(/^gdm::[A-Za-z_0-9]+,/, '');
        const err = new Error(msg);
        if (e instanceof Error && e.stack) err.stack = msg + '\n' + e.stack.split('\n').slice(1).join('\n');
        return err;
      } catch (_) { /* fallthrough */ }
    }
    if (e instanceof Error) return e;
    return new Error(typeof e === 'string' ? e : String(e));
  };
  const patch = (proto) => {
    for (const name of Object.getOwnPropertyNames(proto)) {
      if (name === 'constructor') continue;
      const desc = Object.getOwnPropertyDescriptor(proto, name);
      if (desc && desc.configurable && typeof desc.value === 'function' && !desc.value.__gdPatched) {
        const orig = desc.value;
        const wrapped = function (...args) {
          try { return orig.apply(this, args); } catch (e) { throw decode(e); }
        };
        wrapped.__gdPatched = true;
        Object.defineProperty(proto, name, { ...desc, value: wrapped });
      }
    }
  };
  [core.Node, core.Engine, core.Script, core.Texture].forEach((C) => {
    if (C && C.prototype) patch(C.prototype);
  });
  if (typeof core.initEngine === 'function' && !core.initEngine.__gdPatched) {
    const orig = core.initEngine;
    const wrapped = (...args) => {
      try { return orig(...args); } catch (e) { throw decode(e); }
    };
    wrapped.__gdPatched = true;
    core.initEngine = wrapped;
  }
}

function domCodeToGodot(code) {
  if (Object.prototype.hasOwnProperty.call(DOM_CODE_MAP, code)) return DOM_CODE_MAP[code];
  return 0;
}

// ---- color parsing: '#rrggbb' | '#rrggbbaa' | [r,g,b,a] | {r,g,b,a} ----
function normalizeColor(v) {
  if (typeof v === 'string') {
    let s = v.trim().replace(/^#/, '');
    if (/^[0-9a-fA-F]{6}$/.test(s)) s += 'ff';
    if (/^[0-9a-fA-F]{8}$/.test(s)) {
      return [
        parseInt(s.slice(0, 2), 16) / 255,
        parseInt(s.slice(2, 4), 16) / 255,
        parseInt(s.slice(4, 6), 16) / 255,
        parseInt(s.slice(6, 8), 16) / 255,
      ];
    }
    throw new Error(`invalid color string '${v}' (expected #rrggbb or #rrggbbaa)`);
  }
  return v;  // array / object handled by wasm conversion
}

// ---- draw-command parsing (flat double list from wasm) ----
// [type, a,b,c,d,tx,ty, ...payload..., r,g,b,a]
function parseCommands(flat) {
  const cmds = [];
  let i = 0;
  const n = flat.length;
  while (i < n) {
    const type = flat[i];
    const m = [flat[i + 1], flat[i + 2], flat[i + 3], flat[i + 4], flat[i + 5], flat[i + 6]];
    i += 7;
    if (type === 1) {  // sprite: texId, centered
      cmds.push({ type: 'sprite', m, texId: flat[i], centered: flat[i + 1] !== 0,
                  color: [flat[i + 2], flat[i + 3], flat[i + 4], flat[i + 5]] });
      i += 6;
    } else if (type === 2) {  // rect: x,y,w,h
      cmds.push({ type: 'rect', m, x: flat[i], y: flat[i + 1], w: flat[i + 2], h: flat[i + 3],
                  color: [flat[i + 4], flat[i + 5], flat[i + 6], flat[i + 7]] });
      i += 8;
    } else if (type === 3) {  // circle: x,y,r
      cmds.push({ type: 'circle', m, x: flat[i], y: flat[i + 1], r: flat[i + 2],
                  color: [flat[i + 3], flat[i + 4], flat[i + 5], flat[i + 6]] });
      i += 7;
    } else if (type === 4) {  // line: x1,y1,x2,y2,width
      cmds.push({ type: 'line', m, x1: flat[i], y1: flat[i + 1], x2: flat[i + 2], y2: flat[i + 3],
                  width: flat[i + 4],
                  color: [flat[i + 5], flat[i + 6], flat[i + 7], flat[i + 8]] });
      i += 9;
    } else if (type === 5) {  // poly: count, points...
      const count = flat[i];
      const pts = [];
      for (let k = 0; k < count; k++) pts.push([flat[i + 1 + k * 2], flat[i + 2 + k * 2]]);
      const base = i + 1 + count * 2;
      cmds.push({ type: 'poly', m, points: pts,
                  color: [flat[base], flat[base + 1], flat[base + 2], flat[base + 3]] });
      i = base + 4;
    } else {
      throw new Error('corrupt draw command stream (type=' + type + ')');
    }
  }
  return cmds;
}

// ===================================================================
// v0.2.0 — Simplified 2D physics (JS-side, Godot-flavoured)
//
// Design notes (documented in PATCHES.md §7):
//  - bodies live in JS and drive node.position across the wasm boundary;
//    GDScript reads/writes the same positions (_process/_physics_process).
//  - fixed 60 Hz accumulator, aligned with the wasm `_physics_process` hook.
//  - shapes: axis-aligned rect (centered) and circle. No rotation, no joints,
//    no continuous collision — this is the documented mini subset.
//  - collision events: per-body onCollide, global physics.onCollide,
//    Godot-style signals `body_entered` / `body_exited` and, when the node's
//    script declares them, auto-called methods _on_body_entered/_on_body_exited.
// ===================================================================

class PhysicsBody {
  constructor(node, opts) {
    opts = opts || {};
    this.node = node;
    this.shape = opts.shape === 'circle' ? 'circle' : 'rect';
    this.radius = opts.radius !== undefined ? Number(opts.radius) : 16;
    this.size = opts.size ? [Number(opts.size[0]), Number(opts.size[1])] : [32, 32];
    this.static = !!opts.static;
    this.velocity = opts.velocity ? [Number(opts.velocity[0]), Number(opts.velocity[1])] : [0, 0];
    this.gravityScale = opts.gravity_scale !== undefined ? Number(opts.gravity_scale) : 1;
    this.bounce = opts.bounce !== undefined ? Math.max(0, Number(opts.bounce)) : 0;
    this.damping = opts.damping !== undefined ? Math.max(0, Number(opts.damping)) : 0;
    this.enabled = opts.enabled !== false;
    this.__onCollide = null;
  }
  applyImpulse(ix, iy) {
    if (this.static) throw new Error('applyImpulse on a static body has no effect (static bodies do not move)');
    if (Array.isArray(ix)) { iy = ix[1]; ix = ix[0]; }
    this.velocity[0] += Number(ix);
    this.velocity[1] += Number(iy);
    return this;
  }
  onCollide(fn) {
    if (typeof fn !== 'function') throw new Error('onCollide expects a function');
    this.__onCollide = fn;
    return this;
  }
}

// returns {nx, ny, depth} pushing `a` away from `b`, or null when separated
function __collideShapes(a, b) {
  const pa = a.node.position, pb = b.node.position;
  const ax = pa[0], ay = pa[1], bx = pb[0], by = pb[1];
  if (a.shape === 'circle' && b.shape === 'circle') {
    const dx = ax - bx, dy = ay - by;
    const rr = a.radius + b.radius;
    const d2 = dx * dx + dy * dy;
    if (d2 >= rr * rr) return null;
    if (d2 < 1e-9) return { nx: 0, ny: -1, depth: rr };
    const d = Math.sqrt(d2);
    return { nx: dx / d, ny: dy / d, depth: rr - d };
  }
  if (a.shape === 'rect' && b.shape === 'rect') {
    const dx = ax - bx, dy = ay - by;
    const px = (a.size[0] + b.size[0]) / 2 - Math.abs(dx);
    if (px <= 0) return null;
    const py = (a.size[1] + b.size[1]) / 2 - Math.abs(dy);
    if (py <= 0) return null;
    if (px < py) return { nx: dx < 0 ? -1 : 1, ny: 0, depth: px };
    return { nx: 0, ny: dy < 0 ? -1 : 1, depth: py };
  }
  // mixed: normalize to (circle c, rect r)
  let c, r, flip = false;
  if (a.shape === 'circle') { c = a; r = b; } else { c = b; r = a; flip = true; }
  const pc = c.node.position, pr = r.node.position;
  const hw = r.size[0] / 2, hh = r.size[1] / 2, rad = c.radius;
  const dx0 = pc[0] - pr[0], dy0 = pc[1] - pr[1];
  const cx = Math.max(pr[0] - hw, Math.min(pc[0], pr[0] + hw));
  const cy = Math.max(pr[1] - hh, Math.min(pc[1], pr[1] + hh));
  const dx = pc[0] - cx, dy = pc[1] - cy;
  const d2 = dx * dx + dy * dy;
  let nx, ny, depth;
  if (d2 > rad * rad) return null;
  if (d2 > 1e-9) {
    const d = Math.sqrt(d2);
    nx = dx / d; ny = dy / d; depth = rad - d;
  } else {
    // circle center inside rect: push out along the thinner axis
    const px = hw + rad - Math.abs(dx0), py = hh + rad - Math.abs(dy0);
    if (px < py) { nx = dx0 < 0 ? -1 : 1; ny = 0; depth = px; }
    else { nx = 0; ny = dy0 < 0 ? -1 : 1; depth = py; }
  }
  return flip ? { nx: -nx, ny: -ny, depth } : { nx, ny, depth };
}

class PhysicsEngine {
  constructor(gengine) {
    this.__g = gengine;              // GEngineImpl
    this.gravity = [0, 980];         // matches Godot's default 2D gravity
    this.__bodies = new Set();
    this.__collideHandlers = [];
    this.__touching = new Map();     // pairKey -> [bodyA, bodyB]
    this.__acc = 0;
    this.__lastT = null;
    this.FIXED_DT = 1 / 60;          // aligned with wasm _physics_process
    this.MAX_STEPS = 5;
  }
  body(node, opts) {
    if (!(node instanceof GDNode)) throw new Error('physics.body expects a Node created by the engine');
    return this.__add(node, { static: false, ...(opts || {}) });
  }
  staticBody(node, opts) {
    if (!(node instanceof GDNode)) throw new Error('physics.staticBody expects a Node created by the engine');
    return this.__add(node, { static: true, ...(opts || {}) });
  }
  __add(node, opts) {
    const b = new PhysicsBody(node, opts);
    node.__physicsBody = b;          // proxy stores JS-side (starts with __)
    this.__bodies.add(b);
    return b;
  }
  removeBody(bodyOrNode) {
    const b = bodyOrNode instanceof PhysicsBody ? bodyOrNode
      : (bodyOrNode && bodyOrNode.__physicsBody);
    if (!b) throw new Error('physics.removeBody expects a PhysicsBody or a node with a body');
    this.__bodies.delete(b);
    if (b.node.__physicsBody === b) b.node.__physicsBody = null;
  }
  clear() {
    this.__bodies.clear();
    this.__touching.clear();
    this.__collideHandlers.length = 0;
  }
  onCollide(fn) {
    if (typeof fn !== 'function') throw new Error('physics.onCollide expects a function');
    this.__collideHandlers.push(fn);
    return this;
  }
  get bodyCount() { return this.__bodies.size; }

  // called once per rAF tick from GEngineImpl.__tick (before wasm step)
  frame(t, paused) {
    if (this.__lastT === null) this.__lastT = t;
    const dt = Math.min(Math.max((t - this.__lastT) / 1000, 0), 0.1);
    this.__lastT = t;
    if (paused) return;
    this.__acc += dt;
    let steps = 0;
    while (this.__acc >= this.FIXED_DT && steps < this.MAX_STEPS) {
      this.__step(this.FIXED_DT);
      this.__acc -= this.FIXED_DT;
      steps++;
    }
    if (steps === this.MAX_STEPS) this.__acc = 0;  // avoid spiral of death
  }

  __step(dt) {
    const all = [], dyn = [];
    for (const b of this.__bodies) {
      if (!b.enabled || !b.node.__alive || !b.node.__handle.isAlive()) {
        this.__bodies.delete(b);
        continue;
      }
      all.push(b);
      if (!b.static) dyn.push(b);
    }
    // 1) integrate (gravity + damping + velocity → node.position)
    for (const b of dyn) {
      b.velocity[0] += this.gravity[0] * b.gravityScale * dt;
      b.velocity[1] += this.gravity[1] * b.gravityScale * dt;
      if (b.damping > 0) {
        const f = Math.max(0, 1 - b.damping * dt);
        b.velocity[0] *= f; b.velocity[1] *= f;
      }
      if (b.velocity[0] !== 0 || b.velocity[1] !== 0) {
        const p = b.node.position;
        b.node.position = [p[0] + b.velocity[0] * dt, p[1] + b.velocity[1] * dt];
      }
    }
    // 2) detect + resolve (dynamic vs anything)
    const touchingNow = new Map();   // pairKey -> [a, b]
    for (let i = 0; i < dyn.length; i++) {
      const a = dyn[i];
      for (let j = 0; j < all.length; j++) {
        const b = all[j];
        if (a === b) continue;
        const hit = __collideShapes(a, b);
        if (!hit) continue;
        this.__resolve(a, b, hit);
        const key = a.node.__id < b.node.__id ? a.node.__id + '|' + b.node.__id
                                              : b.node.__id + '|' + a.node.__id;
        touchingNow.set(key, [a, b]);
      }
    }
    // 3) entered / exited bookkeeping (Godot body_entered / body_exited semantics)
    const events = [];
    for (const [key, pair] of touchingNow) {
      if (!this.__touching.has(key)) events.push({ a: pair[0], b: pair[1], type: 'entered' });
    }
    for (const [key, pair] of this.__touching) {
      if (!touchingNow.has(key)) events.push({ a: pair[0], b: pair[1], type: 'exited' });
    }
    this.__touching = touchingNow;
    for (const ev of events) this.__fire(ev);
  }

  __resolve(a, b, hit) {
    const { nx, ny, depth } = hit;
    // positional correction
    if (b.static) {
      const p = a.node.position;
      a.node.position = [p[0] + nx * depth, p[1] + ny * depth];
    } else {
      const pa = a.node.position, pb = b.node.position;
      a.node.position = [pa[0] + nx * depth / 2, pa[1] + ny * depth / 2];
      b.node.position = [pb[0] - nx * depth / 2, pb[1] - ny * depth / 2];
    }
    // velocity response (equal mass, restitution = max of the two)
    const rvx = a.velocity[0] - (b.static ? 0 : b.velocity[0]);
    const rvy = a.velocity[1] - (b.static ? 0 : b.velocity[1]);
    const vn = rvx * nx + rvy * ny;
    if (vn < 0) {
      const e = Math.max(a.bounce, b.bounce);
      const jm = -(1 + e) * vn;
      if (b.static) {
        a.velocity[0] += nx * jm; a.velocity[1] += ny * jm;
      } else {
        a.velocity[0] += nx * jm / 2; a.velocity[1] += ny * jm / 2;
        b.velocity[0] -= nx * jm / 2; b.velocity[1] -= ny * jm / 2;
      }
    }
  }

  __safe(fn) {
    try { fn(); } catch (e) {
      console.error('godot-mini physics callback error:', e && e.message ? e.message : e);
    }
  }
  // signal emission with a once-per-kind hint when the script did not declare it
  __emitSignal(node, sig, partnerName) {
    try {
      node.emitSignal(sig, partnerName);
    } catch (e) {
      const key = sig + ':' + node.__id;
      if (!this.__sigHints) this.__sigHints = new Set();
      if (!this.__sigHints.has(key)) {
        this.__sigHints.add(key);
        console.error(
          `godot-mini physics: cannot emit '${sig}' on '${node.name}' — ` +
          `GDScript scripts must declare it first:  signal ${sig}(partner_name)  ` +
          `(then connect(...) in _ready and resolve the partner via get_node("../partner_name")). ` +
          `JS-side onCollide callbacks need no declaration.`);
      }
    }
  }
  // NOTE on the boundary: node objects cannot cross JS→wasm in this runtime
  // (only primitives/arrays/dicts convert). Signal args therefore carry the
  // partner node's NAME; GDScript resolves it via get_node("../<name>").
  // JS-side callbacks receive the real node proxy — no restriction there.
  __fire(ev) {
    const { a, b, type } = ev;
    const sig = type === 'entered' ? 'body_entered' : 'body_exited';
    if (type === 'entered') {
      if (a.__onCollide) this.__safe(() => a.__onCollide(b.node));
      if (b.__onCollide) this.__safe(() => b.__onCollide(a.node));
      for (const fn of this.__collideHandlers) this.__safe(() => fn(a.node, b.node));
    }
    // Godot-style signals (emitting an undeclared signal is an error upstream too —
    // we log a friendly once-per-node hint instead of throwing into the frame loop)
    this.__emitSignal(a.node, sig, b.node.name);
    this.__emitSignal(b.node, sig, a.node.name);
  }
}

// ===================================================================
// v0.2.0 — Audio (WebAudio, JS-side)
//
// Godot uses an AudioServer with buses; this mini runtime exposes the
// browser's WebAudio through a small Godot-flavoured API (PATCHES.md §7):
//   engine.audio.play(url|ArrayBuffer, {volume, loop, rate}) → handle
//   engine.audio.music(url|ArrayBuffer, {volume})            → handle (single channel)
//   engine.audio.tone(freq, duration, {type, volume})        → handle (oscillator, zero assets)
//   engine.audio.setMasterVolume(v) / stopAll()
// GDScript reaches the same features through the `__gdmAudio` global helper
// (see DOCS.md — GDScript interop chapter).
// ===================================================================

class AudioEngine {
  constructor() {
    this.__ctx = null;
    this.__master = null;
    this.__buffers = new Map();    // url key → decoded AudioBuffer
    this.__active = new Set();     // playing handles
    this.__musicHandle = null;
    this.__nextId = 0;
  }
  __ensure() {
    if (this.__ctx) return this.__ctx;
    const AC = (typeof window !== 'undefined') && (window.AudioContext || window.webkitAudioContext);
    if (!AC) throw new Error('WebAudio is not available in this environment');
    this.__ctx = new AC();
    this.__master = this.__ctx.createGain();
    this.__master.gain.value = 1;
    this.__master.connect(this.__ctx.destination);
    return this.__ctx;
  }
  /** Browsers block audio until a user gesture; the facade auto-unlocks on
   *  the first pointer/key event. Call this manually to unlock earlier. */
  unlock() {
    this.__ensure();
    if (this.__ctx.state === 'suspended') this.__ctx.resume().catch(() => {});
  }
  __unlock = this.unlock;          // internal alias
  __suspend() { if (this.__ctx && this.__ctx.state === 'running') this.__ctx.suspend().catch(() => {}); }
  __resume() { if (this.__ctx && this.__ctx.state === 'suspended') this.__ctx.resume().catch(() => {}); }

  async __buffer(src) {
    const ctx = this.__ensure();
    if (src && typeof src === 'object' && typeof src.getChannelData === 'function') return src; // AudioBuffer
    const key = typeof src === 'string' ? src : null;
    if (key && this.__buffers.has(key)) return this.__buffers.get(key);
    let ab;
    if (typeof src === 'string') {
      const res = await fetch(src);
      if (!res.ok) throw new Error(`audio: failed to fetch '${src}' (HTTP ${res.status})`);
      ab = await res.arrayBuffer();
    } else if (src instanceof ArrayBuffer) {
      ab = src;
    } else {
      throw new Error('audio source must be a URL string or an ArrayBuffer');
    }
    const buf = await new Promise((resolve, reject) => {
      const p = ctx.decodeAudioData(ab.slice(0), resolve, (e) =>
        reject(new Error(`audio: failed to decode '${key || 'buffer'}' (${e && e.message || 'unsupported format'})`)));
      if (p && typeof p.then === 'function') p.then(resolve, reject);
    });
    if (key) this.__buffers.set(key, buf);
    return buf;
  }

  async play(src, opts = {}) {
    const ctx = this.__ensure();
    this.unlock();
    const buf = await this.__buffer(src);
    const node = ctx.createBufferSource();
    node.buffer = buf;
    node.loop = !!opts.loop;
    if (opts.rate) node.playbackRate.value = Math.max(0.07, Number(opts.rate));
    const gain = ctx.createGain();
    gain.gain.value = opts.volume !== undefined ? Math.max(0, Number(opts.volume)) : 1;
    node.connect(gain); gain.connect(this.__master);
    const handle = {
      id: ++this.__nextId,
      duration: buf.duration,
      stop: () => { try { node.stop(); } catch (_) { /* already stopped */ } },
      setVolume: (v) => { gain.gain.value = Math.max(0, Number(v)); },
    };
    node.onended = () => this.__active.delete(handle);
    this.__active.add(handle);
    node.start();
    return handle;
  }

  async music(src, opts = {}) {
    if (this.__musicHandle) { try { this.__musicHandle.stop(); } catch (_) {} this.__musicHandle = null; }
    const h = await this.play(src, {
      loop: opts.loop !== false,
      volume: opts.volume !== undefined ? opts.volume : 0.8,
      rate: opts.rate,
    });
    this.__musicHandle = h;
    return h;
  }

  /** Zero-asset sound: synthesized oscillator beep. Types: sine|square|sawtooth|triangle */
  tone(freq, duration = 0.15, opts = {}) {
    const ctx = this.__ensure();
    this.unlock();
    const osc = ctx.createOscillator();
    osc.type = opts.type || 'square';
    osc.frequency.value = Math.max(1, Number(freq));
    const gain = ctx.createGain();
    const t0 = ctx.currentTime;
    const dur = Math.max(0.01, Number(duration));
    const v = opts.volume !== undefined ? Math.max(0, Number(opts.volume)) : 0.3;
    gain.gain.setValueAtTime(v, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain); gain.connect(this.__master);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
    return {
      id: ++this.__nextId,
      stop: () => { try { osc.stop(); } catch (_) {} },
      setVolume: (x) => { gain.gain.value = Math.max(0, Number(x)); },
    };
  }

  stopAll() {
    for (const h of this.__active) { try { h.stop(); } catch (_) {} }
    this.__active.clear();
    this.__musicHandle = null;
  }
  stopMusic() {
    if (this.__musicHandle) { try { this.__musicHandle.stop(); } catch (_) {} this.__musicHandle = null; }
  }
  setMasterVolume(v) {
    this.__ensure();
    this.__master.gain.value = Math.max(0, Number(v));
  }
  get masterVolume() { return this.__master ? this.__master.gain.value : 1; }
}

class GDNode {
  constructor(engine, handle) {
    this.__engine = engine;
    this.__handle = handle;      // embind Node object
    this.__id = handle.id;
    this.__alive = true;
    this.__physicsBody = null;   // v0.2.0: attached PhysicsBody (JS-side only)
  }
  __check() {
    if (!this.__alive || !this.__handle.isAlive()) {
      this.__alive = false;
      throw new Error(`this node has been freed (queue_free was called)`);
    }
    return this.__handle;
  }
  /** v0.2.0: the PhysicsBody attached by physics.body()/RigidBody2D()/StaticBody2D(), or null */
  get body() { return this.__physicsBody || null; }
  // Godot-style variadic addChild
  addChild(...children) {
    const h = this.__check();
    for (const c of children) {
      if (!(c instanceof GDNode)) throw new Error('addChild expects Node instances');
      h.addChild(c.__check());
    }
    return this;
  }
  removeChild(child) {
    this.__check().removeChild(child.__check());
    return this;
  }
  getChildren() {
    const list = this.__check().getChildren();
    const out = [];
    for (let i = 0; i < list.size(); i++) out.push(this.__engine.__nodeById(list.get(i).id));
    return out;
  }
  getParent() {
    const p = this.__check().getParent();
    return p && p.id ? this.__engine.__nodeById(p.id) : null;
  }
  get name() { return this.__check().getName(); }
  set name(v) { this.__check().setName(String(v)); }
  queueFree() {
    this.__check().queueFree();
    this.__alive = false;
    // v0.2.0: drop any physics body riding on this node
    if (this.__engine && this.__physicsBody) this.__engine.physics.removeBody(this.__physicsBody);
  }
  call(method, ...args) {
    return this.__check().callv(method, args);
  }
  get(prop) { return this.__check().get(prop); }
  set(prop, value) { this.__check().set(prop, value); }
  setProps(props) {
    // colors may be '#hex' — normalize before crossing the boundary
    const clean = {};
    for (const k of Object.keys(props)) {
      clean[k] = k === 'modulate' || k === 'self_modulate' ? normalizeColor(props[k]) : props[k];
    }
    this.__check().setProps(clean);
    return this;
  }
  inspect() { return this.__check().inspect(); }
  connect(signal, targetOrFn, methodName) {
    const h = this.__check();
    if (typeof targetOrFn === 'function') h.connectv(signal, targetOrFn, undefined);
    else if (targetOrFn instanceof GDNode) h.connectv(signal, { __nodeId: targetOrFn.__id }, methodName);
    else throw new Error('connect(signal, targetNode, methodName) or connect(signal, fn)');
    return this;
  }
  emitSignal(signal, ...args) {
    this.__check().emitv(signal, args);
  }
  get texture() { return this.get('texture'); }
  set texture(v) { this.set('texture', v); }
}

// Proxy for Godot-style property access: node.position = [100, 100]
function nodeProxy(node) {
  return new Proxy(node, {
    get(target, prop) {
      if (prop in target) {
        const v = target[prop];
        return typeof v === 'function' ? v.bind(target) : v;
      }
      if (typeof prop === 'string' && target.__alive) {
        try { return target.__check().get(prop); } catch (e) { return undefined; }
      }
      return undefined;
    },
    set(target, prop, value) {
      if (prop in target || typeof prop !== 'string' || prop.startsWith('__')) {
        target[prop] = value;
        return true;
      }
      if (target.__alive) {
        if (prop === 'modulate' || prop === 'self_modulate') value = normalizeColor(value);
        target.__check().set(prop, value);
        return true;
      }
      target[prop] = value;
      return true;
    },
  });
}

class GDScriptRef {
  constructor(handle) {
    this.__handle = handle;
    this.label = handle.getLabel();
    this.methods = handle.getMethodNames();
    this.exportedProps = handle.getExportedProps();
  }
}

class GDTexture {
  constructor(handle) {
    this.__handle = handle;
    this.id = handle.id;
    this.width = handle.width;
    this.height = handle.height;
    this.url = handle.getUrl ? handle.getUrl() : '';
  }
}

class GEngineImpl {
  constructor(core, options) {
    this.__core = core;             // wasm module namespace
    this.__engine = core.initEngine(options.width || 0, options.height || 0, true);
    this.__options = options;
    this.__nodeCache = new Map();   // id -> GDNode proxy
    this.__textures = new Map();    // texId -> ImageBitmap|HTMLImageElement
    this.__onFrame = null;
    this.__raf = 0;
    this.__canvas = options.canvas || null;
    this.__ctx = null;
    this.__running = false;
    this.__paused = false;
    this.__wasmBytes = 0;
    this.__keyListeners = [];
    this.__scripts = new Map();     // v0.2.0: node id -> GDScriptRef (for physics callbacks)
    this.__texReadyHooks = new Map(); // v0.2.0: node id -> fn(texture) (physics shape auto-fit)
    // v0.2.0 subsystems (plain fields so the engine proxy exposes them directly)
    this.physics = new PhysicsEngine(this);
    this.audio = new AudioEngine();
    core.setWrapNodeFn((id) => {
      let w = this.__nodeCache.get(id);
      if (!w) w = this.__makeNode(id);
      return { __nodeId: id, __wrapper: w };
    });
    this.root = this.__wrap(this.__engine.getRoot());
    // v0.2.0: GDScript → physics/audio bridge helpers, reachable from
    // JavaScriptBridge.eval("__gdmAudio.play('hit.wav')") etc. (see DOCS.md)
    if (typeof globalThis !== 'undefined') {
      const self = this;
      globalThis.__gdmAudio = {
        /** play a sound file: __gdmAudio.play('hit.wav', 1.0, false) */
        play(url, volume, loop) {
          self.audio.play(String(url), { volume: Number(volume) || 1, loop: !!loop })
            .catch((e) => console.error('godot-mini audio:', e && e.message ? e.message : e));
        },
        /** one music channel: __gdmAudio.music('bgm.ogg', 0.8) — replaces the previous one */
        music(url, volume) {
          self.audio.music(String(url), { volume: Number(volume) || 0.8, loop: true })
            .catch((e) => console.error('godot-mini audio:', e && e.message ? e.message : e));
        },
        /** zero-asset beep: __gdmAudio.tone(440, 0.15, 'square', 0.3) */
        tone(freq, duration, type, volume) {
          try { self.audio.tone(Number(freq), Number(duration) || 0.15, { type: type ? String(type) : 'square', volume: Number(volume) || 0.3 }); }
          catch (e) { console.error('godot-mini audio:', e && e.message ? e.message : e); }
        },
        stopAll() { self.audio.stopAll(); },
        stopMusic() { self.audio.stopMusic(); },
      };
      globalThis.__gdmPhysics = {
        /** nudge a node's body: __gdmPhysics.impulse(node, -300, -400) */
        impulse(nodeOrId, ix, iy) {
          const id = (nodeOrId && nodeOrId.__id !== undefined) ? nodeOrId.__id : Number(nodeOrId);
          const w = self.__nodeCache.get(id);
          if (w && w.__physicsBody) w.__physicsBody.applyImpulse(Number(ix), Number(iy));
        },
        setGravity(x, y) { self.physics.gravity = [Number(x), Number(y)]; },
      };
    }
  }

  __makeNode(id) {
    const handle = new this.__core.Node(id);
    return new GDNode(this, handle);
  }

  __wrap(handle) {
    const n = new GDNode(this, handle);
    const p = nodeProxy(n);
    this.__nodeCache.set(handle.id, p);
    return p;
  }

  __nodeById(id) {
    let w = this.__nodeCache.get(id);
    if (!w) w = this.__wrap(new this.__core.Node(id));
    return w;
  }

  // ---- node factories ----
  __create(type, props) {
    props = props || {};
    const name = typeof props.name === 'string' ? props.name : '';
    const handle = this.__engine.createNode(type, name);
    const node = this.__wrap(handle);
    // attach script first so @export defaults exist before property assignment
    if (props.script) {
      if (!(props.script instanceof GDScriptRef))
        throw new Error(`${type}: 'script' must be a Script returned by engine.loadScript()`);
      this.__engine.attachScript(node.__handle, props.script.__handle);
      this.__scripts.set(node.__id, props.script);   // v0.2.0: track for physics callbacks
    }
    const rest = { ...props };
    delete rest.script;
    delete rest.name;
    // texture as URL string: load asynchronously, set when ready
    let texturePromise = null;
    const texUrl = typeof rest.texture === 'string' ? rest.texture : null;
    if (texUrl) {
      texturePromise = this.loadTexture(texUrl).then((t) => {
        node.set('texture', t);
        const hook = this.__texReadyHooks.get(node.__id);   // v0.2.0: physics auto-fit
        if (hook) { try { hook(t); } catch (e) { console.error('godot-mini:', e && e.message ? e.message : e); } }
      });
      delete rest.texture;
    }
    if (Object.keys(rest).length) node.setProps(rest);
    if (texturePromise)
      texturePromise.catch((e) =>
        console.error(`godot-mini: texture '${texUrl}' failed to load: ${e && e.message ? e.message : e}`)
      );
    return node;
  }
  Node(props) { return this.__create('Node', props); }
  Node2D(props) { return this.__create('Node2D', props); }
  Sprite2D(props) { return this.__create('Sprite2D', props); }
  Camera2D(props) { return this.__create('Camera2D', props); }
  Timer(props) { return this.__create('Timer', props); }

  // ---- v0.2.0 physics factories (Godot-style names, JS-side bodies) ----
  static __PHYS_KEYS = ['shape', 'radius', 'size', 'velocity', 'bounce', 'damping', 'gravity_scale'];
  __physicsFactory(props, isStatic) {
    props = props || {};
    const rest = { ...props };
    const popts = {};
    for (const k of GEngineImpl.__PHYS_KEYS) {
      if (k in rest) { popts[k] = rest[k]; delete rest[k]; }
    }
    const dimsGiven = popts.radius !== undefined || popts.size !== undefined;
    const node = this.__create('Sprite2D', rest);
    popts.static = isStatic;
    const body = this.physics.body(node, popts);
    // texture-loaded later? auto-fit the shape to the texture unless dims were explicit
    if (!dimsGiven && typeof props.texture === 'string') {
      this.__texReadyHooks.set(node.__id, (t) => {
        const b = node.__physicsBody;
        if (!b) return;
        if (b.shape === 'circle') b.radius = Math.max(1, Math.min(t.width, t.height) / 2);
        else b.size = [t.width, t.height];
      });
    }
    return node;
  }
  RigidBody2D(props) { return this.__physicsFactory(props, false); }
  StaticBody2D(props) { return this.__physicsFactory(props, true); }

  // ---- scripts ----
  async loadScript(sourceOrUrl) {
    let source, label;
    const s = String(sourceOrUrl);
    const looksLikeSource = s.includes('\n') || /\bextends\b/.test(s) || /\bfunc\b/.test(s);
    if (looksLikeSource && !/^https?:/.test(s)) {
      source = s;
      label = '<inline:' + Math.abs(hashString(s)) + '>';
    } else {
      label = s;
      const res = await fetch(s);
      if (!res.ok) throw new Error(`loadScript: failed to fetch '${s}' (HTTP ${res.status})`);
      source = await res.text();
    }
    const handle = this.__engine.registerScriptUrl(label, source);
    return new GDScriptRef(handle);
  }

  // ---- textures ----
  async loadTexture(urlOrBuffer) {
    let image, url = '';
    if (typeof urlOrBuffer === 'string') {
      url = urlOrBuffer;
      image = new Image();
      image.crossOrigin = 'anonymous';
      image.src = url;
      await image.decode();
    } else if (urlOrBuffer instanceof ArrayBuffer) {
      const blob = new Blob([urlOrBuffer]);
      image = await createImageBitmap(blob);
    } else {
      throw new Error('loadTexture expects a URL string or ArrayBuffer');
    }
    const handle = this.__engine.registerTexture(image.width, image.height, url);
    this.__textures.set(handle.id, image);
    return new GDTexture(handle);
  }

  // ---- lifecycle ----
  onFrame(cb) {
    this.__onFrame = cb;
  }
  start() {
    if (this.__running) return;
    this.__engine.start();
    this.__running = true;
    this.__paused = false;
    this.physics.__lastT = null;   // v0.2.0: no dt jump after idle
    if (typeof requestAnimationFrame === 'function') {
      const loop = (t) => {
        if (!this.__running) return;
        this.__tick(t);
        this.__raf = requestAnimationFrame(loop);
      };
      this.__raf = requestAnimationFrame(loop);
    }
  }
  pause() {
    this.__paused = true;
    this.__engine.pause();
    this.audio.__suspend();        // v0.2.0: pause sounds with the engine
  }
  resume() {
    this.__paused = false;
    this.__engine.resume();
    this.audio.__resume();
  }
  get paused() { return this.__paused; }

  __tick(t) {
    try {
      // v0.2.0: physics steps first (fixed 60 Hz) so _process/_physics_process
      // inside wasm see freshly integrated positions.
      try { this.physics.frame(t, this.__paused); }
      catch (e) { console.error('godot-mini physics error:', e && e.message ? e.message : e); }
      let delta = this.__engine.step(t);
      if (!this.__paused && this.__onFrame) this.__onFrame(delta);
      this.__engine.renderFrame();
      const cmds = parseCommands(this.takeCommandsArray());
      if (this.__ctx) drawCommands(this.__ctx, cmds, this.__textures, this.__canvas);
    } catch (e) {
      console.error('godot-mini frame error:', e && e.message ? e.message : e);
    }
  }

  takeCommandsArray() {
    const v = this.__engine.takeCommands();
    const out = new Array(v.size());
    for (let i = 0; i < v.size(); i++) out[i] = v.get(i);
    return out;
  }

  // ---- scene ----
  saveScene() { return this.__engine.saveScene(); }
  loadScene(json, opts) {
    // v0.2.0: accept a JSON string as well as the object returned by saveScene()
    if (typeof json === 'string') {
      try { json = JSON.parse(json); }
      catch (e) { throw new Error(`loadScene: invalid scene JSON — ${e.message}`); }
    }
    this.__engine.loadScene(json, !opts || opts.replace !== false);
  }

  // ---- input ----
  get input() {
    const eng = this;
    const wasm = this.__engine;
    return {
      isKeyPressed: (key) => wasm.isKeyPressed(key),
      isMouseButtonPressed: (btn) => wasm.isMouseButtonPressed(btn),
      get mouse() { return wasm.getMousePos(); },
      // ---- v0.2.0 multi-touch ----
      /** live list of active touches: [{id, x, y}, ...] in canvas CSS pixels */
      get touches() {
        return eng.__touchState ? Array.from(eng.__touchState.values())
          : [];
      },
      get touchCount() { return eng.__touchState ? eng.__touchState.size : 0; },
      isTouchDown: (id) => (eng.__touchState ? eng.__touchState.has(id) : false),
    };
  }

  // ---- JS bridge ----
  get js() {
    const eng = this.__engine;
    return {
      // SECURITY: eval executes arbitrary code in the page. Only use with trusted content.
      eval: (code) => eng.jsEval(code),
      on: (name, fn) => eng.jsOn(name, fn),
      emit: (name, data) => eng.jsEmit(name, data),
    };
  }

  // ---- browser wiring ----
  __attachDom(canvas) {
    this.__canvas = canvas;
    this.__ctx = canvas.getContext('2d');
    const send = (fn) => (e) => {
      const code = domCodeToGodot(e.code);
      if (code) {
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space', 'Tab'].includes(e.code))
          e.preventDefault();
        fn(code, e);
      }
    };
    window.addEventListener('keydown', send((code, e) => {
      if (!e.repeat) this.__engine.pushKey(code, true, false, e.shiftKey, e.ctrlKey, e.altKey);
    }));
    window.addEventListener('keyup', send((code, e) => {
      this.__engine.pushKey(code, false, false, e.shiftKey, e.ctrlKey, e.altKey);
    }));
    const rectOf = (e) => {
      const r = canvas.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    canvas.addEventListener('mousedown', (e) => {
      const [x, y] = rectOf(e);
      this.__engine.pushMouseButton(e.button + 1, true, x, y);
    });
    canvas.addEventListener('mouseup', (e) => {
      const [x, y] = rectOf(e);
      this.__engine.pushMouseButton(e.button + 1, false, x, y);
    });
    canvas.addEventListener('mousemove', (e) => {
      const [x, y] = rectOf(e);
      this.__engine.pushMouseMotion(x, y, e.shiftKey, e.ctrlKey, e.altKey);
    });

    // ---- v0.2.0 audio unlock (browsers require a user gesture) ----
    const unlockAudio = () => {
      try { this.audio.__ensure(); this.audio.unlock(); } catch (_) { /* no WebAudio */ }
    };
    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    // ---- v0.2.0 touch support ----
    // 1) the FIRST finger emulates the mouse (mouse_button + mouse_motion), so every
    //    existing input path — GDScript _input, engine.input.mouse, isMouseButtonPressed —
    //    works unchanged on phones;
    // 2) all fingers are tracked in __touchState for multi-touch games.
    canvas.style.touchAction = 'none';            // stop scroll/zoom gestures
    canvas.style.userSelect = 'none';
    canvas.style.webkitUserSelect = 'none';
    canvas.style.webkitTapHighlightColor = 'transparent';
    const touches = new Map();                     // touch identifier → {id, x, y}
    this.__touchState = touches;
    let mouseTouchId = null;                       // which finger drives the mouse
    const touchPos = (t) => {
      const r = canvas.getBoundingClientRect();
      return [t.clientX - r.left, t.clientY - r.top];
    };
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();                          // also suppresses synthetic mouse events
      for (const t of e.changedTouches) {
        const [x, y] = touchPos(t);
        touches.set(t.identifier, { id: t.identifier, x, y });
        if (mouseTouchId === null) {
          mouseTouchId = t.identifier;
          this.__engine.pushMouseButton(1, true, x, y);
        }
      }
    }, { passive: false });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        const rec = touches.get(t.identifier);
        if (!rec) continue;
        const [x, y] = touchPos(t);
        rec.x = x; rec.y = y;
        if (t.identifier === mouseTouchId) {
          this.__engine.pushMouseMotion(x, y, false, false, false);
        }
      }
    }, { passive: false });
    const endTouch = (e) => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        const rec = touches.get(t.identifier);
        if (!rec) continue;
        if (t.identifier === mouseTouchId) {
          const [x, y] = touchPos(t);
          this.__engine.pushMouseButton(1, false, x, y);
          mouseTouchId = null;
        }
        touches.delete(t.identifier);
      }
    };
    canvas.addEventListener('touchend', endTouch, { passive: false });
    canvas.addEventListener('touchcancel', endTouch, { passive: false });

    // keep canvas backing store in sync with CSS size
    const sync = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      this.__engine.setViewportSize(canvas.width, canvas.height);
    };
    sync();
    window.addEventListener('resize', sync);
    this.__syncSize = sync;
  }
}

function hashString(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

// ---- Canvas2D renderer ----
function drawCommands(ctx, cmds, textures, canvas) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = false;
  for (const c of cmds) {
    const m = c.m;
    ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
    const col = c.color;
    if (c.type === 'sprite') {
      const img = textures.get(c.texId);
      ctx.globalAlpha = Math.max(0, Math.min(1, col[3]));
      if (img) {
        const w = img.width || img.videoWidth, h = img.height || img.videoHeight;
        const ox = c.centered ? -w / 2 : 0;
        const oy = c.centered ? -h / 2 : 0;
        ctx.drawImage(img, ox, oy, w, h);
      } else {
        // texture-less Sprite2D placeholder: 32x32 rect (documented)
        const s = 32;
        const ox = c.centered ? -s / 2 : 0;
        const oy = c.centered ? -s / 2 : 0;
        ctx.fillStyle = `rgb(${(col[0] * 255) | 0},${(col[1] * 255) | 0},${(col[2] * 255) | 0})`;
        ctx.fillRect(ox, oy, s, s);
      }
      ctx.globalAlpha = 1;
    } else if (c.type === 'rect') {
      ctx.fillStyle = `rgba(${(col[0] * 255) | 0},${(col[1] * 255) | 0},${(col[2] * 255) | 0},${col[3]})`;
      ctx.fillRect(c.x, c.y, c.w, c.h);
    } else if (c.type === 'circle') {
      ctx.fillStyle = `rgba(${(col[0] * 255) | 0},${(col[1] * 255) | 0},${(col[2] * 255) | 0},${col[3]})`;
      ctx.beginPath();
      ctx.arc(c.x, c.y, Math.max(0.1, c.r), 0, Math.PI * 2);
      ctx.fill();
    } else if (c.type === 'line') {
      ctx.strokeStyle = `rgba(${(col[0] * 255) | 0},${(col[1] * 255) | 0},${(col[2] * 255) | 0},${col[3]})`;
      ctx.lineWidth = Math.max(0.1, c.width);
      ctx.beginPath();
      ctx.moveTo(c.x1, c.y1);
      ctx.lineTo(c.x2, c.y2);
      ctx.stroke();
    } else if (c.type === 'poly') {
      ctx.fillStyle = `rgba(${(col[0] * 255) | 0},${(col[1] * 255) | 0},${(col[2] * 255) | 0},${col[3]})`;
      ctx.beginPath();
      ctx.moveTo(c.points[0][0], c.points[0][1]);
      for (let k = 1; k < c.points.length; k++) ctx.lineTo(c.points[k][0], c.points[k][1]);
      ctx.closePath();
      ctx.fill();
    }
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

// ---- public static facade ----
const GEngine = {
  VERSION,
  KEY,
  MOUSE_LEFT,
  MOUSE_RIGHT,
  MOUSE_MIDDLE,
  async init(options = {}) {
    if (!CORE_FACTORY) throw new Error('godot-mini: internal error (core factory missing)');
    const core = await CORE_FACTORY({
      locateFile: (file) => new URL(file, import.meta.url).href,
      // no filesystem, single thread: nothing else to configure
    });
    patchErrorDecoding(core);
    let canvas = options.canvas || null;
    if (typeof canvas === 'string') canvas = document.querySelector(canvas);
    if (options.canvas && !canvas) throw new Error(`GEngine.init: canvas '${options.canvas}' not found`);
    const engine = new GEngineImpl(core, { ...options, canvas });
    if (canvas) engine.__attachDom(canvas);
    return engineProxy(engine);
  },
};

function engineProxy(engine) {
  // make `engine.root` and node factories accessible; keep methods bound
  return new Proxy(engine, {
    get(target, prop) {
      if (prop in target) {
        const v = target[prop];
        return typeof v === 'function' ? v.bind(target) : v;
      }
      return undefined;
    },
  });
}

export { GEngine, GDNode, GDScriptRef, GDTexture, PhysicsBody, AudioEngine, parseCommands, drawCommands, domCodeToGodot, KEY };
if (typeof globalThis !== 'undefined') {
  globalThis.GEngine = GEngine;  // convenience when imported for side effects
}
