import{E as p,U as Ie,T as j,k as C,c as se,F as y,s as P,M as v,a2 as L,R as X,w as ae,z as ie,$ as R,a0 as ne,b as S,B as T,x as G,a9 as We,aa as H,J as V,ab as U,q,t as Ve,G as Oe,Y as Ye,ac as O,m as oe,p as ue,a4 as le,a7 as de,n as Ee,o as Le,a5 as Xe,a6 as He,a8 as qe,ad as $e,ae as Ne,af as je,ag as Y,ah as Qe,ai as Ke,D as ce,l as he,aj as Je,ak as Ze,al as et,am as Q,an as A,e as b,ao as tt}from"./index-R4t34zpc.js";import{S as M,c as D,a as rt,b as st,B as fe}from"./colorToUniform-DmtBy-2V.js";class pe{static init(e){Object.defineProperty(this,"resizeTo",{set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let t,r;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,r=globalThis.innerHeight;else{const{clientWidth:s,clientHeight:i}=this._resizeTo;t=s,r=i}this.renderer.resize(t,r),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}pe.extension=p.Application;class me{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,Ie.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?j.shared:new j,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}me.extension=p.Application;class ge{constructor(e){this._renderer=e}push(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}ge.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"filter"};function at(n,e){e.clear();const t=e.matrix;for(let r=0;r<n.length;r++){const s=n[r];s.globalDisplayStatus<7||(e.matrix=s.worldTransform,e.addBounds(s.bounds))}return e.matrix=t,e}const it=new L({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class nt{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new ie,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0}}}class xe{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new C({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new se({}),this.renderer=e}get activeBackTexture(){var e;return(e=this._activeFilterData)==null?void 0:e.backTexture}push(e){const t=this.renderer,r=e.filterEffect.filters,s=this._pushFilterData();s.skip=!1,s.filters=r,s.container=e.container,s.outputRenderSurface=t.renderTarget.renderSurface;const i=t.renderTarget.renderTarget.colorTexture.source,a=i.resolution,o=i.antialias;if(r.length===0){s.skip=!0;return}const l=s.bounds;if(this._calculateFilterArea(e,l),this._calculateFilterBounds(s,t.renderTarget.rootViewPort,o,a,1),s.skip)return;const d=this._getPreviousFilterData(),h=this._findFilterResolution(a);let u=0,c=0;d&&(u=d.bounds.minX,c=d.bounds.minY),this._calculateGlobalFrame(s,u,c,h,i.width,i.height),this._setupFilterTextures(s,l,t,d)}generateFilteredTexture({texture:e,filters:t}){const r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=t;const s=e.source,i=s.resolution,a=s.antialias;if(t.length===0)return r.skip=!0,e;const o=r.bounds;if(o.addRect(e.frame),this._calculateFilterBounds(r,o.rectangle,a,i,0),r.skip)return e;const l=i;this._calculateGlobalFrame(r,0,0,l,s.width,s.height),r.outputRenderSurface=y.getOptimalTexture(o.width,o.height,r.resolution,r.antialias),r.backTexture=P.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);const c=r.outputRenderSurface;return c.source.alphaMode="premultiplied-alpha",c}pop(){const e=this.renderer,t=this._popFilterData();t.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=t,this._applyFiltersToTexture(t,!1),t.blendRequired&&y.returnTexture(t.backTexture),y.returnTexture(t.inputTexture))}getBackTexture(e,t,r){const s=e.colorTexture.source._resolution,i=y.getOptimalTexture(t.width,t.height,s,!1);let a=t.minX,o=t.minY;r&&(a-=r.minX,o-=r.minY),a=Math.floor(a*s),o=Math.floor(o*s);const l=Math.ceil(t.width*s),d=Math.ceil(t.height*s);return this.renderer.renderTarget.copyToTexture(e,i,{x:a,y:o},{width:l,height:d},{x:0,y:0}),i}applyFilter(e,t,r,s){const i=this.renderer,a=this._activeFilterData,l=a.outputRenderSurface===r,d=i.renderTarget.rootRenderTarget.colorTexture.source._resolution,h=this._findFilterResolution(d);let u=0,c=0;if(l){const f=this._findPreviousFilterOffset();u=f.x,c=f.y}this._updateFilterUniforms(t,r,a,u,c,h,l,s),this._setupBindGroupsAndRender(e,t,i)}calculateSpriteMatrix(e,t){const r=this._activeFilterData,s=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),i=t.worldTransform.copyTo(v.shared),a=t.renderGroup||t.parentRenderGroup;return a&&a.cacheToLocalTransform&&i.prepend(a.cacheToLocalTransform),i.invert(),s.prepend(i),s.scale(1/t.texture.frame.width,1/t.texture.frame.height),s.translate(t.anchor.x,t.anchor.y),s}destroy(){}_setupBindGroupsAndRender(e,t,r){if(r.renderPipes.uniformBatch){const s=r.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(s,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,r.encoder.draw({geometry:it,shader:e,state:e._state,topology:"triangle-list"}),r.type===X.WEBGL&&r.renderTarget.finishRenderPass()}_setupFilterTextures(e,t,r,s){if(e.backTexture=P.EMPTY,e.blendRequired){r.renderTarget.finishRenderPass();const i=r.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(i,t,s==null?void 0:s.bounds)}e.inputTexture=y.getOptimalTexture(t.width,t.height,e.resolution,e.antialias),r.renderTarget.bind(e.inputTexture,!0),r.globalUniforms.push({offset:t})}_calculateGlobalFrame(e,t,r,s,i,a){const o=e.globalFrame;o.x=t*s,o.y=r*s,o.width=i*s,o.height=a*s}_updateFilterUniforms(e,t,r,s,i,a,o,l){const d=this._filterGlobalUniforms.uniforms,h=d.uOutputFrame,u=d.uInputSize,c=d.uInputPixel,f=d.uInputClamp,_=d.uGlobalFrame,g=d.uOutputTexture;o?(h[0]=r.bounds.minX-s,h[1]=r.bounds.minY-i):(h[0]=0,h[1]=0),h[2]=e.frame.width,h[3]=e.frame.height,u[0]=e.source.width,u[1]=e.source.height,u[2]=1/u[0],u[3]=1/u[1],c[0]=e.source.pixelWidth,c[1]=e.source.pixelHeight,c[2]=1/c[0],c[3]=1/c[1],f[0]=.5*c[2],f[1]=.5*c[3],f[2]=e.frame.width*u[2]-.5*c[2],f[3]=e.frame.height*u[3]-.5*c[3];const m=this.renderer.renderTarget.rootRenderTarget.colorTexture;_[0]=s*a,_[1]=i*a,_[2]=m.source.width*a,_[3]=m.source.height*a,t instanceof P&&(t.source.resource=null);const x=this.renderer.renderTarget.getRenderTarget(t);this.renderer.renderTarget.bind(t,!!l),t instanceof P?(g[0]=t.frame.width,g[1]=t.frame.height):(g[0]=x.width,g[1]=x.height),g[2]=x.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let t=this._filterStackIndex-1;for(;t>0&&this._filterStack[t].skip;)--t;return t>0&&this._filterStack[t].inputTexture?this._filterStack[t].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,t=0,r=this._filterStackIndex;for(;r>0;){r--;const s=this._filterStack[r];if(!s.skip){e=s.bounds.minX,t=s.bounds.minY;break}}return{x:e,y:t}}_calculateFilterArea(e,t){if(e.renderables?at(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){const s=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;s&&t.applyMatrix(s)}}_applyFiltersToTexture(e,t){const r=e.inputTexture,s=e.bounds,i=e.filters;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),i.length===1)i[0].apply(this,r,e.outputRenderSurface,t);else{let a=e.inputTexture;const o=y.getOptimalTexture(s.width,s.height,a.source._resolution,!1);let l=o,d=0;for(d=0;d<i.length-1;++d){i[d].apply(this,a,l,!0);const u=a;a=l,l=u}i[d].apply(this,a,e.outputRenderSurface,t),y.returnTexture(o)}}_calculateFilterBounds(e,t,r,s,i){var g;const a=this.renderer,o=e.bounds,l=e.filters;let d=1/0,h=0,u=!0,c=!1,f=!1,_=!0;for(let m=0;m<l.length;m++){const x=l[m];if(d=Math.min(d,x.resolution==="inherit"?s:x.resolution),h+=x.padding,x.antialias==="off"?u=!1:x.antialias==="inherit"&&u&&(u=r),x.clipToViewport||(_=!1),!!!(x.compatibleRenderers&a.type)){f=!1;break}if(x.blendRequired&&!(((g=a.backBuffer)==null?void 0:g.useBackBuffer)??!0)){ae("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),f=!1;break}f=x.enabled||f,c||(c=x.blendRequired)}if(!f){e.skip=!0;return}if(_&&o.fitBounds(0,t.width/s,0,t.height/s),o.scale(d).ceil().scale(1/d).pad((h|0)*i),!o.isPositive){e.skip=!0;return}e.antialias=u,e.resolution=d,e.blendRequired=c}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>1&&(t--,e=this._filterStack[t],!!e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new nt),this._filterStackIndex++,e}}xe.extension={type:[p.WebGLSystem,p.WebGPUSystem],name:"filter"};const _e=class be extends L{constructor(...e){let t=e[0]??{};t instanceof Float32Array&&(R(ne,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:e[1],indices:e[2]}),t={...be.defaultOptions,...t};const r=t.positions||new Float32Array([0,0,1,0,1,1,0,1]);let s=t.uvs;s||(t.positions?s=new Float32Array(r.length):s=new Float32Array([0,0,1,0,1,1,0,1]));const i=t.indices||new Uint32Array([0,1,2,0,2,3]),a=t.shrinkBuffersToFit,o=new S({data:r,label:"attribute-mesh-positions",shrinkToFit:a,usage:T.VERTEX|T.COPY_DST}),l=new S({data:s,label:"attribute-mesh-uvs",shrinkToFit:a,usage:T.VERTEX|T.COPY_DST}),d=new S({data:i,label:"index-mesh-buffer",shrinkToFit:a,usage:T.INDEX|T.COPY_DST});super({attributes:{aPosition:{buffer:o,format:"float32x2",stride:8,offset:0},aUV:{buffer:l,format:"float32x2",stride:8,offset:0}},indexBuffer:d,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(e){this.attributes.aPosition.buffer.data=e}get uvs(){return this.attributes.aUV.buffer.data}set uvs(e){this.attributes.aUV.buffer.data=e}get indices(){return this.indexBuffer.data}set indices(e){this.indexBuffer.data=e}};_e.defaultOptions={topology:"triangle-list",shrinkBuffersToFit:!1};let $=_e;class ot{constructor(){this.batches=[],this.batched=!1}destroy(){this.batches.forEach(e=>{G.return(e)}),this.batches.length=0}}class ye{constructor(e,t){this.state=M.for2d(),this.renderer=e,this._adaptor=t,this.renderer.runners.contextChange.add(this)}contextChange(){this._adaptor.contextChange(this.renderer)}validateRenderable(e){const t=e.context,r=!!e._gpuData,s=this.renderer.graphicsContext.updateGpuContext(t);return!!(s.isBatchable||r!==s.isBatchable)}addRenderable(e,t){const r=this.renderer.graphicsContext.updateGpuContext(e.context);e.didViewUpdate&&this._rebuild(e),r.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add(e))}updateRenderable(e){const r=this._getGpuDataForRenderable(e).batches;for(let s=0;s<r.length;s++){const i=r[s];i._batcher.updateElement(i)}}execute(e){if(!e.isRenderable)return;const t=this.renderer,r=e.context;if(!t.graphicsContext.getGpuContext(r).batches.length)return;const i=r.customShader||this._adaptor.shader;this.state.blendMode=e.groupBlendMode;const a=i.resources.localUniforms.uniforms;a.uTransformMatrix=e.groupTransform,a.uRound=t._roundPixels|e._roundPixels,D(e.groupColorAlpha,a.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){const t=this._getGpuDataForRenderable(e),r=this.renderer.graphicsContext.updateGpuContext(e.context);t.destroy(),r.isBatchable&&this._updateBatchesForRenderable(e,t)}_addToBatcher(e,t){const r=this.renderer.renderPipes.batch,s=this._getGpuDataForRenderable(e).batches;for(let i=0;i<s.length;i++){const a=s[i];r.addToBatch(a,t)}}_getGpuDataForRenderable(e){return e._gpuData[this.renderer.uid]||this._initGpuDataForRenderable(e)}_initGpuDataForRenderable(e){const t=new ot;return e._gpuData[this.renderer.uid]=t,t}_updateBatchesForRenderable(e,t){const r=e.context,s=this.renderer.graphicsContext.getGpuContext(r),i=this.renderer._roundPixels|e._roundPixels;t.batches=s.batches.map(a=>{const o=G.get(We);return a.copyTo(o),o.renderable=e,o.roundPixels=i,o})}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null}}ye.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"graphics"};const Te=class ve extends ${constructor(...e){super({});let t=e[0]??{};typeof t=="number"&&(R(ne,"PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"),t={width:t,height:e[1],verticesX:e[2],verticesY:e[3]}),this.build(t)}build(e){e={...ve.defaultOptions,...e},this.verticesX=this.verticesX??e.verticesX,this.verticesY=this.verticesY??e.verticesY,this.width=this.width??e.width,this.height=this.height??e.height;const t=this.verticesX*this.verticesY,r=[],s=[],i=[],a=this.verticesX-1,o=this.verticesY-1,l=this.width/a,d=this.height/o;for(let u=0;u<t;u++){const c=u%this.verticesX,f=u/this.verticesX|0;r.push(c*l,f*d),s.push(c/a,f/o)}const h=a*o;for(let u=0;u<h;u++){const c=u%a,f=u/a|0,_=f*this.verticesX+c,g=f*this.verticesX+c+1,m=(f+1)*this.verticesX+c,x=(f+1)*this.verticesX+c+1;i.push(_,g,m,g,x,m)}this.buffers[0].data=new Float32Array(r),this.buffers[1].data=new Float32Array(s),this.indexBuffer.data=new Uint32Array(i),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};Te.defaultOptions={width:100,height:100,verticesX:10,verticesY:10};let ut=Te;class N{constructor(){this.batcherName="default",this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){const t=this.geometry.getBuffer("aUV"),r=t.data;let s=r;const i=this.texture.textureMatrix;return i.isSimple||(s=this._transformedUvs,(this._textureMatrixUpdateId!==i._updateID||this._uvUpdateId!==t._updateID)&&((!s||s.length<r.length)&&(s=this._transformedUvs=new Float32Array(r.length)),this._textureMatrixUpdateId=i._updateID,this._uvUpdateId=t._updateID,i.multiplyUvs(r,s))),s}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}}class K{destroy(){}}class Pe{constructor(e,t){this.localUniforms=new C({uTransformMatrix:{value:new v,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),this.localUniformsBindGroup=new se({0:this.localUniforms}),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=this._getMeshData(e),r=t.batched,s=e.batched;if(t.batched=s,r!==s)return!0;if(s){const i=e._geometry;if(i.indices.length!==t.indexSize||i.positions.length!==t.vertexSize)return t.indexSize=i.indices.length,t.vertexSize=i.positions.length,!0;const a=this._getBatchableMesh(e);return a.texture.uid!==e._texture.uid&&(a._textureMatrixUpdateId=-1),!a._batcher.checkAndUpdateTexture(a,e._texture)}return!1}addRenderable(e,t){const r=this.renderer.renderPipes.batch,{batched:s}=this._getMeshData(e);if(s){const i=this._getBatchableMesh(e);i.setTexture(e._texture),i.geometry=e._geometry,r.addToBatch(i,t)}else r.break(t),t.add(e)}updateRenderable(e){if(e.batched){const t=this._getBatchableMesh(e);t.setTexture(e._texture),t.geometry=e._geometry,t._batcher.updateElement(t)}}execute(e){if(!e.isRenderable)return;e.state.blendMode=H(e.groupBlendMode,e.texture._source);const t=this.localUniforms;t.uniforms.uTransformMatrix=e.groupTransform,t.uniforms.uRound=this.renderer._roundPixels|e._roundPixels,t.update(),D(e.groupColorAlpha,t.uniforms.uColor,0),this._adaptor.execute(this,e)}_getMeshData(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new K),e._gpuData[this.renderer.uid].meshData||this._initMeshData(e)}_initMeshData(e){var t,r;return e._gpuData[this.renderer.uid].meshData={batched:e.batched,indexSize:(t=e._geometry.indices)==null?void 0:t.length,vertexSize:(r=e._geometry.positions)==null?void 0:r.length},e._gpuData[this.renderer.uid].meshData}_getBatchableMesh(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new K),e._gpuData[this.renderer.uid].batchableMesh||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=new N;return t.renderable=e,t.setTexture(e._texture),t.transform=e.groupTransform,t.roundPixels=this.renderer._roundPixels|e._roundPixels,e._gpuData[this.renderer.uid].batchableMesh=t,t}destroy(){this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}Pe.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"mesh"};class lt{execute(e,t){const r=e.state,s=e.renderer,i=t.shader||e.defaultShader;i.resources.uTexture=t.texture._source,i.resources.uniforms=e.localUniforms;const a=s.gl,o=e.getBuffers(t);s.shader.bind(i),s.state.set(r),s.geometry.bind(o.geometry,i.glProgram);const d=o.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?a.UNSIGNED_SHORT:a.UNSIGNED_INT;a.drawElements(a.TRIANGLES,t.particleChildren.length*6,d,0)}}class dt{execute(e,t){const r=e.renderer,s=t.shader||e.defaultShader;s.groups[0]=r.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),s.groups[1]=r.texture.getTextureBindGroup(t.texture);const i=e.state,a=e.getBuffers(t);r.encoder.draw({geometry:a.geometry,shader:t.shader||e.defaultShader,state:i,size:t.particleChildren.length*6})}}function J(n,e=null){const t=n*6;if(t>65535?e||(e=new Uint32Array(t)):e||(e=new Uint16Array(t)),e.length!==t)throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${t}`);for(let r=0,s=0;r<t;r+=6,s+=4)e[r+0]=s+0,e[r+1]=s+1,e[r+2]=s+2,e[r+3]=s+0,e[r+4]=s+2,e[r+5]=s+3;return e}function ct(n){return{dynamicUpdate:Z(n,!0),staticUpdate:Z(n,!1)}}function Z(n,e){const t=[];t.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let r=0;for(const i in n){const a=n[i];if(e!==a.dynamic)continue;t.push(`offset = index + ${r}`),t.push(a.code);const o=V(a.format);r+=o.stride/4}t.push(`
            index += stride * 4;
        }
    `),t.unshift(`
        var stride = ${r};
    `);const s=t.join(`
`);return new Function("ps","f32v","u32v",s)}class ht{constructor(e){this._size=0,this._generateParticleUpdateCache={};const t=this._size=e.size??1e3,r=e.properties;let s=0,i=0;for(const h in r){const u=r[h],c=V(u.format);u.dynamic?i+=c.stride:s+=c.stride}this._dynamicStride=i/4,this._staticStride=s/4,this.staticAttributeBuffer=new U(t*4*s),this.dynamicAttributeBuffer=new U(t*4*i),this.indexBuffer=J(t);const a=new L;let o=0,l=0;this._staticBuffer=new S({data:new Float32Array(1),label:"static-particle-buffer",shrinkToFit:!1,usage:T.VERTEX|T.COPY_DST}),this._dynamicBuffer=new S({data:new Float32Array(1),label:"dynamic-particle-buffer",shrinkToFit:!1,usage:T.VERTEX|T.COPY_DST});for(const h in r){const u=r[h],c=V(u.format);u.dynamic?(a.addAttribute(u.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:o*4,format:u.format}),o+=c.size):(a.addAttribute(u.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:l*4,format:u.format}),l+=c.size)}a.addIndex(this.indexBuffer);const d=this.getParticleUpdate(r);this._dynamicUpload=d.dynamicUpdate,this._staticUpload=d.staticUpdate,this.geometry=a}getParticleUpdate(e){const t=ft(e);return this._generateParticleUpdateCache[t]?this._generateParticleUpdateCache[t]:(this._generateParticleUpdateCache[t]=this.generateParticleUpdate(e),this._generateParticleUpdateCache[t])}generateParticleUpdate(e){return ct(e)}update(e,t){e.length>this._size&&(t=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new U(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new U(this._size*this._dynamicStride*4*4),this.indexBuffer=J(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));const r=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,r.float32View,r.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),t){const s=this.staticAttributeBuffer;this._staticUpload(e,s.float32View,s.uint32View),this._staticBuffer.setDataWithSize(s.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}}function ft(n){const e=[];for(const t in n){const r=n[t];e.push(t,r.code,r.dynamic?"d":"s")}return e.join("_")}var pt=`varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`,mt=`attribute vec2 aVertex;
attribute vec2 aUV;
attribute vec4 aColor;

attribute vec2 aPosition;
attribute float aRotation;

uniform mat3 uTranslationMatrix;
uniform float uRound;
uniform vec2 uResolution;
uniform vec4 uColor;

varying vec2 vUV;
varying vec4 vColor;

vec2 roundPixels(vec2 position, vec2 targetSize)
{       
    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

void main(void){
    float cosRotation = cos(aRotation);
    float sinRotation = sin(aRotation);
    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;
    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;

    vec2 v = vec2(x, y);
    v = v + aPosition;

    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    if(uRound == 1.0)
    {
        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
    }

    vUV = aUV;
    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;
}
`,ee=`
struct ParticleUniforms {
  uProjectionMatrix:mat3x3<f32>,
  uColor:vec4<f32>,
  uResolution:vec2<f32>,
  uRoundPixels:f32,
};

@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;

@group(1) @binding(0) var uTexture: texture_2d<f32>;
@group(1) @binding(1) var uSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };
@vertex
fn mainVertex(
  @location(0) aVertex: vec2<f32>,
  @location(1) aPosition: vec2<f32>,
  @location(2) aUV: vec2<f32>,
  @location(3) aColor: vec4<f32>,
  @location(4) aRotation: f32,
) -> VSOutput {
  
   let v = vec2(
       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),
       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)
   ) + aPosition;

   let position = vec4((uniforms.uProjectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;

  return VSOutput(
   position,
   aUV,
   vColor,
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {

    var sample = textureSample(uTexture, uSampler, uv) * color;
   
    return sample;
}`;class gt extends q{constructor(){const e=Ve.from({vertex:mt,fragment:pt}),t=Oe.from({fragment:{source:ee,entryPoint:"mainFragment"},vertex:{source:ee,entryPoint:"mainVertex"}});super({glProgram:e,gpuProgram:t,resources:{uTexture:P.WHITE.source,uSampler:new O({}),uniforms:{uTranslationMatrix:{value:new v,type:"mat3x3<f32>"},uColor:{value:new Ye(16777215),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}}})}}class we{constructor(e,t){this.state=M.for2d(),this.localUniforms=new C({uTranslationMatrix:{value:new v,type:"mat3x3<f32>"},uColor:{value:new Float32Array(4),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}),this.renderer=e,this.adaptor=t,this.defaultShader=new gt,this.state=M.for2d()}validateRenderable(e){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}getBuffers(e){return e._gpuData[this.renderer.uid]||this._initBuffer(e)}_initBuffer(e){return e._gpuData[this.renderer.uid]=new ht({size:e.particleChildren.length,properties:e._properties}),e._gpuData[this.renderer.uid]}updateRenderable(e){}execute(e){const t=e.particleChildren;if(t.length===0)return;const r=this.renderer,s=this.getBuffers(e);e.texture||(e.texture=t[0].texture);const i=this.state;s.update(t,e._childrenDirty),e._childrenDirty=!1,i.blendMode=H(e.blendMode,e.texture._source);const a=this.localUniforms.uniforms,o=a.uTranslationMatrix;e.worldTransform.copyTo(o),o.prepend(r.globalUniforms.globalUniformData.projectionMatrix),a.uResolution=r.globalUniforms.globalUniformData.resolution,a.uRound=r._roundPixels|e._roundPixels,D(e.groupColorAlpha,a.uColor,0),this.adaptor.execute(this,e)}destroy(){this.defaultShader&&(this.defaultShader.destroy(),this.defaultShader=null)}}class Ce extends we{constructor(e){super(e,new lt)}}Ce.extension={type:[p.WebGLPipes],name:"particle"};class Se extends we{constructor(e){super(e,new dt)}}Se.extension={type:[p.WebGPUPipes],name:"particle"};const Ue=class Be extends ut{constructor(e={}){e={...Be.defaultOptions,...e},super({width:e.width,height:e.height,verticesX:4,verticesY:4}),this.update(e)}update(e){var t,r;this.width=e.width??this.width,this.height=e.height??this.height,this._originalWidth=e.originalWidth??this._originalWidth,this._originalHeight=e.originalHeight??this._originalHeight,this._leftWidth=e.leftWidth??this._leftWidth,this._rightWidth=e.rightWidth??this._rightWidth,this._topHeight=e.topHeight??this._topHeight,this._bottomHeight=e.bottomHeight??this._bottomHeight,this._anchorX=(t=e.anchor)==null?void 0:t.x,this._anchorY=(r=e.anchor)==null?void 0:r.y,this.updateUvs(),this.updatePositions()}updatePositions(){const e=this.positions,{width:t,height:r,_leftWidth:s,_rightWidth:i,_topHeight:a,_bottomHeight:o,_anchorX:l,_anchorY:d}=this,h=s+i,u=t>h?1:t/h,c=a+o,f=r>c?1:r/c,_=Math.min(u,f),g=l*t,m=d*r;e[0]=e[8]=e[16]=e[24]=-g,e[2]=e[10]=e[18]=e[26]=s*_-g,e[4]=e[12]=e[20]=e[28]=t-i*_-g,e[6]=e[14]=e[22]=e[30]=t-g,e[1]=e[3]=e[5]=e[7]=-m,e[9]=e[11]=e[13]=e[15]=a*_-m,e[17]=e[19]=e[21]=e[23]=r-o*_-m,e[25]=e[27]=e[29]=e[31]=r-m,this.getBuffer("aPosition").update()}updateUvs(){const e=this.uvs;e[0]=e[8]=e[16]=e[24]=0,e[1]=e[3]=e[5]=e[7]=0,e[6]=e[14]=e[22]=e[30]=1,e[25]=e[27]=e[29]=e[31]=1;const t=1/this._originalWidth,r=1/this._originalHeight;e[2]=e[10]=e[18]=e[26]=t*this._leftWidth,e[9]=e[11]=e[13]=e[15]=r*this._topHeight,e[4]=e[12]=e[20]=e[28]=1-t*this._rightWidth,e[17]=e[19]=e[21]=e[23]=1-r*this._bottomHeight,this.getBuffer("aUV").update()}};Ue.defaultOptions={width:100,height:100,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10,originalWidth:100,originalHeight:100};let xt=Ue;class _t extends N{constructor(){super(),this.geometry=new xt}destroy(){this.geometry.destroy()}}class Fe{constructor(e){this._renderer=e}addRenderable(e,t){const r=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,t),t._batcher.updateElement(t)}validateRenderable(e){const t=this._getGpuSprite(e);return!t._batcher.checkAndUpdateTexture(t,e._texture)}_updateBatchableSprite(e,t){t.geometry.update(e),t.setTexture(e._texture)}_getGpuSprite(e){return e._gpuData[this._renderer.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=e._gpuData[this._renderer.uid]=new _t,r=t;return r.renderable=e,r.transform=e.groupTransform,r.texture=e._texture,r.roundPixels=this._renderer._roundPixels|e._roundPixels,e.didViewUpdate||this._updateBatchableSprite(e,r),t}destroy(){this._renderer=null}}Fe.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"nineSliceSprite"};const bt={name:"tiling-bit",vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            }

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},yt={name:"tiling-bit",vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;

        `,main:`
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0

        `}};let k,z;class Tt extends q{constructor(){k??(k=oe({name:"tiling-sprite-shader",bits:[rt,bt,ue]})),z??(z=le({name:"tiling-sprite-shader",bits:[st,yt,de]}));const e=new C({uMapCoord:{value:new v,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new v,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:z,gpuProgram:k,resources:{localUniforms:new C({uTransformMatrix:{value:new v,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:P.EMPTY.source,uSampler:P.EMPTY.source.style}})}updateUniforms(e,t,r,s,i,a){const o=this.resources.tilingUniforms,l=a.width,d=a.height,h=a.textureMatrix,u=o.uniforms.uTextureTransform;u.set(r.a*l/e,r.b*l/t,r.c*d/e,r.d*d/t,r.tx/e,r.ty/t),u.invert(),o.uniforms.uMapCoord=h.mapCoord,o.uniforms.uClampFrame=h.uClampFrame,o.uniforms.uClampOffset=h.uClampOffset,o.uniforms.uTextureTransform=u,o.uniforms.uSizeAnchor[0]=e,o.uniforms.uSizeAnchor[1]=t,o.uniforms.uSizeAnchor[2]=s,o.uniforms.uSizeAnchor[3]=i,a&&(this.resources.uTexture=a.source,this.resources.uSampler=a.source.style)}}class vt extends ${constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}function Pt(n,e){const t=n.anchor.x,r=n.anchor.y;e[0]=-t*n.width,e[1]=-r*n.height,e[2]=(1-t)*n.width,e[3]=-r*n.height,e[4]=(1-t)*n.width,e[5]=(1-r)*n.height,e[6]=-t*n.width,e[7]=(1-r)*n.height}function wt(n,e,t,r){let s=0;const i=n.length/e,a=r.a,o=r.b,l=r.c,d=r.d,h=r.tx,u=r.ty;for(t*=e;s<i;){const c=n[t],f=n[t+1];n[t]=a*c+l*f+h,n[t+1]=o*c+d*f+u,t+=e,s++}}function Ct(n,e){const t=n.texture,r=t.frame.width,s=t.frame.height;let i=0,a=0;n.applyAnchorToTexture&&(i=n.anchor.x,a=n.anchor.y),e[0]=e[6]=-i,e[2]=e[4]=1-i,e[1]=e[3]=-a,e[5]=e[7]=1-a;const o=v.shared;o.copyFrom(n._tileTransform.matrix),o.tx/=n.width,o.ty/=n.height,o.invert(),o.scale(n.width/r,n.height/s),wt(e,2,0,o)}const F=new vt;class St{constructor(){this.canBatch=!0,this.geometry=new $({indices:F.indices.slice(),positions:F.positions.slice(),uvs:F.uvs.slice()})}destroy(){var e;this.geometry.destroy(),(e=this.shader)==null||e.destroy()}}class Re{constructor(e){this._state=M.default2d,this._renderer=e}validateRenderable(e){const t=this._getTilingSpriteData(e),r=t.canBatch;this._updateCanBatch(e);const s=t.canBatch;if(s&&s===r){const{batchableMesh:i}=t;return!i._batcher.checkAndUpdateTexture(i,e.texture)}return r!==s}addRenderable(e,t){const r=this._renderer.renderPipes.batch;this._updateCanBatch(e);const s=this._getTilingSpriteData(e),{geometry:i,canBatch:a}=s;if(a){s.batchableMesh||(s.batchableMesh=new N);const o=s.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),o.geometry=i,o.renderable=e,o.transform=e.groupTransform,o.setTexture(e._texture)),o.roundPixels=this._renderer._roundPixels|e._roundPixels,r.addToBatch(o,t)}else r.break(t),s.shader||(s.shader=new Tt),this.updateRenderable(e),t.add(e)}execute(e){const{shader:t}=this._getTilingSpriteData(e);t.groups[0]=this._renderer.globalUniforms.bindGroup;const r=t.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=this._renderer._roundPixels|e._roundPixels,D(e.groupColorAlpha,r.uColor,0),this._state.blendMode=H(e.groupBlendMode,e.texture._source),this._renderer.encoder.draw({geometry:F,shader:t,state:this._state})}updateRenderable(e){const t=this._getTilingSpriteData(e),{canBatch:r}=t;if(r){const{batchableMesh:s}=t;e.didViewUpdate&&this._updateBatchableMesh(e),s._batcher.updateElement(s)}else if(e.didViewUpdate){const{shader:s}=t;s.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const t=new St;return t.renderable=e,e._gpuData[this._renderer.uid]=t,t}_updateBatchableMesh(e){const t=this._getTilingSpriteData(e),{geometry:r}=t,s=e.texture.source.style;s.addressMode!=="repeat"&&(s.addressMode="repeat",s.update()),Ct(e,r.uvs),Pt(e,r.positions)}destroy(){this._renderer=null}_updateCanBatch(e){const t=this._getTilingSpriteData(e),r=e.texture;let s=!0;return this._renderer.type===X.WEBGL&&(s=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=r.textureMatrix.isSimple&&(s||r.source.isPowerOfTwo),t.canBatch}}Re.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"tilingSprite"};const Ut={name:"local-uniform-msdf-bit",vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:`
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `}},Bt={name:"local-uniform-msdf-bit",vertex:{header:`
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `},fragment:{header:`
            uniform float uDistance;
         `,main:`
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `}},Ft={name:"msdf-bit",fragment:{header:`
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {

                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;

            }
        `}},Rt={name:"msdf-bit",fragment:{header:`
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {

                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);

                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);

                return coverage;
            }
        `}};let I,W;class Gt extends q{constructor(e){const t=new C({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new v,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"},uRound:{value:0,type:"f32"}});I??(I=oe({name:"sdf-shader",bits:[Ee,Le(e),Ut,Ft,ue]})),W??(W=le({name:"sdf-shader",bits:[Xe,He(e),Bt,Rt,de]})),super({glProgram:W,gpuProgram:I,resources:{localUniforms:t,batchSamplers:qe(e)}})}}class Mt extends Qe{destroy(){this.context.customShader&&this.context.customShader.destroy(),super.destroy()}}class Ge{constructor(e){this._renderer=e,this._renderer.renderableGC.addManagedHash(this,"_gpuBitmapText")}validateRenderable(e){const t=this._getGpuBitmapText(e);return e._didTextUpdate&&(e._didTextUpdate=!1,this._updateContext(e,t)),this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const r=this._getGpuBitmapText(e);te(e,r),e._didTextUpdate&&(e._didTextUpdate=!1,this._updateContext(e,r)),this._renderer.renderPipes.graphics.addRenderable(r,t),r.context.customShader&&this._updateDistanceField(e)}updateRenderable(e){const t=this._getGpuBitmapText(e);te(e,t),this._renderer.renderPipes.graphics.updateRenderable(t),t.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){const{context:r}=t,s=$e.getFont(e.text,e._style);r.clear(),s.distanceField.type!=="none"&&(r.customShader||(r.customShader=new Gt(this._renderer.limits.maxBatchableTextures)));const i=Ne.graphemeSegmenter(e.text),a=e._style;let o=s.baseLineOffset;const l=je(i,a,s,!0),d=a.padding,h=l.scale;let u=l.width,c=l.height+l.offsetY;a._stroke&&(u+=a._stroke.width/h,c+=a._stroke.width/h),r.translate(-e._anchor._x*u-d,-e._anchor._y*c-d).scale(h,h);const f=s.applyFillAsTint?a._fill.color:16777215;for(let _=0;_<l.lines.length;_++){const g=l.lines[_];for(let m=0;m<g.charPositions.length;m++){const x=g.chars[m],w=s.chars[x];w!=null&&w.texture&&r.texture(w.texture,f||"black",Math.round(g.charPositions[m]+w.xOffset),Math.round(o+w.yOffset))}o+=s.lineHeight}}_getGpuBitmapText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new Mt;return e._gpuData[this._renderer.uid]=t,this._updateContext(e,t),t}_updateDistanceField(e){const t=this._getGpuBitmapText(e).context,r=e._style.fontFamily,s=Y.get(`${r}-bitmap`),{a:i,b:a,c:o,d:l}=e.groupTransform,d=Math.sqrt(i*i+a*a),h=Math.sqrt(o*o+l*l),u=(Math.abs(d)+Math.abs(h))/2,c=s.baseRenderedFontSize/e._style.fontSize,f=u*s.distanceField.range*(1/c);t.customShader.resources.localUniforms.uniforms.uDistance=f}destroy(){this._renderer=null}}Ge.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"bitmapText"};function te(n,e){e.groupTransform=n.groupTransform,e.groupColorAlpha=n.groupColorAlpha,e.groupColor=n.groupColor,e.groupBlendMode=n.groupBlendMode,e.globalDisplayStatus=n.globalDisplayStatus,e.groupTransform=n.groupTransform,e.localDisplayStatus=n.localDisplayStatus,e.groupAlpha=n.groupAlpha,e._roundPixels=n._roundPixels}class Dt extends fe{constructor(e){super(),this.generatingTexture=!1,this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){this._renderer.htmlText.returnTexturePromise(this.texturePromise),this.texturePromise=null,this._renderer=null}}function E(n,e){const{texture:t,bounds:r}=n,s=e._style._getFinalPadding();Ke(r,e._anchor,t);const i=e._anchor._x*s*2,a=e._anchor._y*s*2;r.minX-=s-i,r.minY-=s-a,r.maxX-=s-i,r.maxY-=s-a}class Me{constructor(e){this._renderer=e}validateRenderable(e){return e._didTextUpdate}addRenderable(e,t){const r=this._getGpuText(e);e._didTextUpdate&&(this._updateGpuText(e).catch(s=>{console.error(s)}),e._didTextUpdate=!1,E(r,e)),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}async _updateGpuText(e){e._didTextUpdate=!1;const t=this._getGpuText(e);if(t.generatingTexture)return;t.texturePromise&&(this._renderer.htmlText.returnTexturePromise(t.texturePromise),t.texturePromise=null),t.generatingTexture=!0,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const r=this._renderer.htmlText.getTexturePromise(e);t.texturePromise=r,t.texture=await r;const s=e.renderGroup||e.parentRenderGroup;s&&(s.structureDidChange=!0),t.generatingTexture=!1,E(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new Dt(this._renderer);return t.renderable=e,t.transform=e.groupTransform,t.texture=P.EMPTY,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}Me.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"htmlText"};function At(){const{userAgent:n}=ce.get().getNavigator();return/^((?!chrome|android).)*safari/i.test(n)}const kt=new ie;function De(n,e,t,r){const s=kt;s.minX=0,s.minY=0,s.maxX=n.width/r|0,s.maxY=n.height/r|0;const i=y.getOptimalTexture(s.width,s.height,r,!1);return i.source.uploadMethodId="image",i.source.resource=n,i.source.alphaMode="premultiply-alpha-on-upload",i.frame.width=e/r,i.frame.height=t/r,i.source.emit("update",i.source),i.updateUvs(),i}function zt(n,e){const t=e.fontFamily,r=[],s={},i=/font-family:([^;"\s]+)/g,a=n.match(i);function o(l){s[l]||(r.push(l),s[l]=!0)}if(Array.isArray(t))for(let l=0;l<t.length;l++)o(t[l]);else o(t);a&&a.forEach(l=>{const d=l.split(":")[1].trim();o(d)});for(const l in e.tagStyles){const d=e.tagStyles[l].fontFamily;o(d)}return r}async function It(n){const t=await(await ce.get().fetch(n)).blob(),r=new FileReader;return await new Promise((i,a)=>{r.onloadend=()=>i(r.result),r.onerror=a,r.readAsDataURL(t)})}async function re(n,e){const t=await It(e);return`@font-face {
        font-family: "${n.fontFamily}";
        src: url('${t}');
        font-weight: ${n.fontWeight};
        font-style: ${n.fontStyle};
    }`}const B=new Map;async function Wt(n,e,t){const r=n.filter(s=>Y.has(`${s}-and-url`)).map((s,i)=>{if(!B.has(s)){const{url:a}=Y.get(`${s}-and-url`);i===0?B.set(s,re({fontWeight:e.fontWeight,fontStyle:e.fontStyle,fontFamily:s},a)):B.set(s,re({fontWeight:t.fontWeight,fontStyle:t.fontStyle,fontFamily:s},a))}return B.get(s)});return(await Promise.all(r)).join(`
`)}function Vt(n,e,t,r,s){const{domElement:i,styleElement:a,svgRoot:o}=s;i.innerHTML=`<style>${e.cssStyle}</style><div style='padding:0;'>${n}</div>`,i.setAttribute("style",`transform: scale(${t});transform-origin: top left; display: inline-block`),a.textContent=r;const{width:l,height:d}=s.image;return o.setAttribute("width",l.toString()),o.setAttribute("height",d.toString()),new XMLSerializer().serializeToString(o)}function Ot(n,e){const t=he.getOptimalCanvasAndContext(n.width,n.height,e),{context:r}=t;return r.clearRect(0,0,n.width,n.height),r.drawImage(n,0,0),t}function Yt(n,e,t){return new Promise(async r=>{t&&await new Promise(s=>setTimeout(s,100)),n.onload=()=>{r()},n.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,n.crossOrigin="anonymous"})}class Ae{constructor(e){this._renderer=e,this._createCanvas=e.type===X.WEBGPU}getTexture(e){return this.getTexturePromise(e)}getTexturePromise(e){return this._buildTexturePromise(e)}async _buildTexturePromise(e){const{text:t,style:r,resolution:s,textureStyle:i}=e,a=G.get(Je),o=zt(t,r),l=await Wt(o,r,Ze.defaultTextStyle),d=et(t,r,l,a),h=Math.ceil(Math.ceil(Math.max(1,d.width)+r.padding*2)*s),u=Math.ceil(Math.ceil(Math.max(1,d.height)+r.padding*2)*s),c=a.image,f=2;c.width=(h|0)+f,c.height=(u|0)+f;const _=Vt(t,r,s,l,a);await Yt(c,_,At()&&o.length>0);const g=c;let m;this._createCanvas&&(m=Ot(c,s));const x=De(m?m.canvas:g,c.width-f,c.height-f,s);return i&&(x.source.style=i),this._createCanvas&&(this._renderer.texture.initSource(x.source),he.returnCanvasAndContext(m)),G.return(a),x}returnTexturePromise(e){e.then(t=>{this._cleanUp(t)}).catch(()=>{ae("HTMLTextSystem: Failed to clean texture")})}_cleanUp(e){y.returnTexture(e,!0),e.source.resource=null,e.source.uploadMethodId="unknown"}destroy(){this._renderer=null}}Ae.extension={type:[p.WebGLSystem,p.WebGPUSystem,p.CanvasSystem],name:"htmlText"};class Et extends fe{constructor(e){super(),this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){this._renderer.canvasText.returnTexture(this.texture),this._renderer=null}}class ke{constructor(e){this._renderer=e}validateRenderable(e){return e._didTextUpdate}addRenderable(e,t){const r=this._getGpuText(e);e._didTextUpdate&&(this._updateGpuText(e),e._didTextUpdate=!1),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){const t=this._getGpuText(e);t.texture&&this._renderer.canvasText.returnTexture(t.texture),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=t.texture=this._renderer.canvasText.getTexture(e),E(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new Et(this._renderer);return t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}ke.extension={type:[p.WebGLPipes,p.WebGPUPipes,p.CanvasPipes],name:"text"};class ze{constructor(e){this._renderer=e}getTexture(e,t,r,s){typeof e=="string"&&(R("8.0.0","CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"),e={text:e,style:r,resolution:t}),e.style instanceof Q||(e.style=new Q(e.style)),e.textureStyle instanceof O||(e.textureStyle=new O(e.textureStyle)),typeof e.text!="string"&&(e.text=e.text.toString());const{text:i,style:a,textureStyle:o}=e,l=e.resolution??this._renderer.resolution,{frame:d,canvasAndContext:h}=A.getCanvasAndContext({text:i,style:a,resolution:l}),u=De(h.canvas,d.width,d.height,l);if(o&&(u.source.style=o),a.trim&&(d.pad(a.padding),u.frame.copyFrom(d),u.updateUvs()),a.filters){const c=this._applyFilters(u,a.filters);return this.returnTexture(u),A.returnCanvasAndContext(h),c}return this._renderer.texture.initSource(u._source),A.returnCanvasAndContext(h),u}returnTexture(e){const t=e.source;t.resource=null,t.uploadMethodId="unknown",t.alphaMode="no-premultiply-alpha",y.returnTexture(e,!0)}renderTextToCanvas(){R("8.10.0","CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead")}_applyFilters(e,t){const r=this._renderer.renderTarget.renderTarget,s=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind(r,!1),s}destroy(){this._renderer=null}}ze.extension={type:[p.WebGLSystem,p.WebGPUSystem,p.CanvasSystem],name:"canvasText"};b.add(pe);b.add(me);b.add(ye);b.add(tt);b.add(Pe);b.add(Ce);b.add(Se);b.add(ze);b.add(ke);b.add(Ge);b.add(Ae);b.add(Me);b.add(Re);b.add(Fe);b.add(xe);b.add(ge);
