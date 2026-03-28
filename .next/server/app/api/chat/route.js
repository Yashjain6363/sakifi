"use strict";(()=>{var e={};e.id=744,e.ids=[744],e.modules={517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},1794:(e,t,n)=>{n.r(t),n.d(t,{headerHooks:()=>eg,originalPathname:()=>eE,patchFetch:()=>ey,requestAsyncStorage:()=>eh,routeModule:()=>ed,serverHooks:()=>ep,staticGenerationAsyncStorage:()=>ef,staticGenerationBailout:()=>em});var s,o,i,r,a,l,c,u,d,h,f,p,g={};n.r(g),n.d(g,{POST:()=>eu,dynamic:()=>eo,maxDuration:()=>ei,runtime:()=>es});var m=n(5419),E=n(9108),y=n(9678),C=n(8984);(function(e){e.STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object"})(s||(s={})),function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"}(o||(o={})),function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"}(i||(i={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let v=["user","model","function","system"];(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",e.HARM_CATEGORY_CIVIC_INTEGRITY="HARM_CATEGORY_CIVIC_INTEGRITY"})(r||(r={})),function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"}(a||(a={})),function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"}(l||(l={})),function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"}(c||(c={})),function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.BLOCKLIST="BLOCKLIST",e.PROHIBITED_CONTENT="PROHIBITED_CONTENT",e.SPII="SPII",e.MALFORMED_FUNCTION_CALL="MALFORMED_FUNCTION_CALL",e.OTHER="OTHER"}(u||(u={})),function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"}(d||(d={})),function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"}(h||(h={})),function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.MODE_DYNAMIC="MODE_DYNAMIC"}(f||(f={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class _ extends O{constructor(e,t){super(e),this.response=t}}class I extends O{constructor(e,t,n,s){super(e),this.status=t,this.statusText=n,this.errorDetails=s}}class A extends O{}class w extends O{}!function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"}(p||(p={}));class R{constructor(e,t,n,s,o){this.model=e,this.task=t,this.apiKey=n,this.stream=s,this.requestOptions=o}toString(){var e,t;let n=(null===(e=this.requestOptions)||void 0===e?void 0:e.apiVersion)||"v1beta",s=(null===(t=this.requestOptions)||void 0===t?void 0:t.baseUrl)||"https://generativelanguage.googleapis.com",o=`${s}/${n}/${this.model}:${this.task}`;return this.stream&&(o+="?alt=sse"),o}}async function S(e){var t;let n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",function(e){let t=[];return(null==e?void 0:e.apiClient)&&t.push(e.apiClient),t.push("genai-js/0.24.1"),t.join(" ")}(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let s=null===(t=e.requestOptions)||void 0===t?void 0:t.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(e){throw new A(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${e.message}`)}for(let[e,t]of s.entries()){if("x-goog-api-key"===e)throw new A(`Cannot set reserved header name ${e}`);if("x-goog-api-client"===e)throw new A(`Header name ${e} can only be set using the apiClient field`);n.append(e,t)}}return n}async function N(e,t,n,s,o,i){let r=new R(e,t,n,s,i);return{url:r.toString(),fetchOptions:Object.assign(Object.assign({},function(e){let t={};if((null==e?void 0:e.signal)!==void 0||(null==e?void 0:e.timeout)>=0){let n=new AbortController;(null==e?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),(null==e?void 0:e.signal)&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}(i)),{method:"POST",headers:await S(r),body:o})}}async function T(e,t,n,s,o,i={},r=fetch){let{url:a,fetchOptions:l}=await N(e,t,n,s,o,i);return b(a,l,r)}async function b(e,t,n=fetch){let s;try{s=await n(e,t)}catch(t){(function(e,t){let n=e;throw"AbortError"===n.name?(n=new w(`Request aborted when fetching ${t.toString()}: ${e.message}`)).stack=e.stack:e instanceof I||e instanceof A||((n=new O(`Error fetching from ${t.toString()}: ${e.message}`)).stack=e.stack),n})(t,e)}return s.ok||await x(s,e),s}async function x(e,t){let n,s="";try{let t=await e.json();s=t.error.message,t.error.details&&(s+=` ${JSON.stringify(t.error.details)}`,n=t.error.details)}catch(e){}throw new I(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${s}`,e.status,e.statusText,n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),j(e.candidates[0]))throw new _(`${k(e)}`,e);return function(e){var t,n,s,o;let i=[];if(null===(n=null===(t=e.candidates)||void 0===t?void 0:t[0].content)||void 0===n?void 0:n.parts)for(let t of null===(o=null===(s=e.candidates)||void 0===s?void 0:s[0].content)||void 0===o?void 0:o.parts)t.text&&i.push(t.text),t.executableCode&&i.push("\n```"+t.executableCode.language+"\n"+t.executableCode.code+"\n```\n"),t.codeExecutionResult&&i.push("\n```\n"+t.codeExecutionResult.output+"\n```\n");return i.length>0?i.join(""):""}(e)}if(e.promptFeedback)throw new _(`Text not available. ${k(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),j(e.candidates[0]))throw new _(`${k(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),D(e)[0]}if(e.promptFeedback)throw new _(`Function call not available. ${k(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),j(e.candidates[0]))throw new _(`${k(e)}`,e);return D(e)}if(e.promptFeedback)throw new _(`Function call not available. ${k(e)}`,e)},e}function D(e){var t,n,s,o;let i=[];if(null===(n=null===(t=e.candidates)||void 0===t?void 0:t[0].content)||void 0===n?void 0:n.parts)for(let t of null===(o=null===(s=e.candidates)||void 0===s?void 0:s[0].content)||void 0===o?void 0:o.parts)t.functionCall&&i.push(t.functionCall);return i.length>0?i:void 0}let P=[u.RECITATION,u.SAFETY,u.LANGUAGE];function j(e){return!!e.finishReason&&P.includes(e.finishReason)}function k(e){var t,n,s;let o="";if((!e.candidates||0===e.candidates.length)&&e.promptFeedback)o+="Response was blocked",(null===(t=e.promptFeedback)||void 0===t?void 0:t.blockReason)&&(o+=` due to ${e.promptFeedback.blockReason}`),(null===(n=e.promptFeedback)||void 0===n?void 0:n.blockReasonMessage)&&(o+=`: ${e.promptFeedback.blockReasonMessage}`);else if(null===(s=e.candidates)||void 0===s?void 0:s[0]){let t=e.candidates[0];j(t)&&(o+=`Candidate was blocked due to ${t.finishReason}`,t.finishMessage&&(o+=`: ${t.finishMessage}`))}return o}function L(e){return this instanceof L?(this.v=e,this):new L(e)}"function"==typeof SuppressedError&&SuppressedError;/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let G=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function U(e){let t=[],n=e.getReader();for(;;){let{done:e,value:s}=await n.read();if(e)return M(function(e){let t=e[e.length-1],n={promptFeedback:null==t?void 0:t.promptFeedback};for(let t of e){if(t.candidates){let e=0;for(let s of t.candidates)if(n.candidates||(n.candidates=[]),n.candidates[e]||(n.candidates[e]={index:e}),n.candidates[e].citationMetadata=s.citationMetadata,n.candidates[e].groundingMetadata=s.groundingMetadata,n.candidates[e].finishReason=s.finishReason,n.candidates[e].finishMessage=s.finishMessage,n.candidates[e].safetyRatings=s.safetyRatings,s.content&&s.content.parts){n.candidates[e].content||(n.candidates[e].content={role:s.content.role||"user",parts:[]});let t={};for(let o of s.content.parts)o.text&&(t.text=o.text),o.functionCall&&(t.functionCall=o.functionCall),o.executableCode&&(t.executableCode=o.executableCode),o.codeExecutionResult&&(t.codeExecutionResult=o.codeExecutionResult),0===Object.keys(t).length&&(t.text=""),n.candidates[e].content.parts.push(t)}e++}t.usageMetadata&&(n.usageMetadata=t.usageMetadata)}return n}(t));t.push(s)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $(e,t,n,s){return function(e){let[t,n]=(function(e){let t=e.getReader();return new ReadableStream({start(e){let n="";return function s(){return t.read().then(({value:t,done:o})=>{let i;if(o){if(n.trim()){e.error(new O("Failed to parse stream"));return}e.close();return}let r=(n+=t).match(G);for(;r;){try{i=JSON.parse(r[1])}catch(t){e.error(new O(`Error parsing JSON response: "${r[1]}"`));return}e.enqueue(i),r=(n=n.substring(r[0].length)).match(G)}return s()}).catch(e=>{let t=e;throw t.stack=e.stack,t="AbortError"===t.name?new w("Request aborted when reading from the stream"):new O("Error reading from the stream")})}()}})})(e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0}))).tee();return{stream:function(e){return function(e,t,n){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var s,o=n.apply(e,t||[]),i=[];return s={},r("next"),r("throw"),r("return"),s[Symbol.asyncIterator]=function(){return this},s;function r(e){o[e]&&(s[e]=function(t){return new Promise(function(n,s){i.push([e,t,n,s])>1||a(e,t)})})}function a(e,t){try{var n;(n=o[e](t)).value instanceof L?Promise.resolve(n.value.v).then(l,c):u(i[0][2],n)}catch(e){u(i[0][3],e)}}function l(e){a("next",e)}function c(e){a("throw",e)}function u(e,t){e(t),i.shift(),i.length&&a(i[0][0],i[0][1])}}(this,arguments,function*(){let t=e.getReader();for(;;){let{value:e,done:n}=yield L(t.read());if(n)break;yield yield L(M(e))}})}(t),response:U(n)}}(await T(t,p.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),s))}async function H(e,t,n,s){let o=await T(t,p.GENERATE_CONTENT,e,!1,JSON.stringify(n),s);return{response:M(await o.json())}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(e){if(null!=e){if("string"==typeof e)return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function Y(e){let t=[];if("string"==typeof e)t=[{text:e}];else for(let n of e)"string"==typeof n?t.push({text:n}):t.push(n);return function(e){let t={role:"user",parts:[]},n={role:"function",parts:[]},s=!1,o=!1;for(let i of e)"functionResponse"in i?(n.parts.push(i),o=!0):(t.parts.push(i),s=!0);if(s&&o)throw new O("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!o)throw new O("No content is provided for sending chat message.");return s?t:n}(t)}function K(e){let t;return t=e.contents?e:{contents:[Y(e)]},e.systemInstruction&&(t.systemInstruction=F(e.systemInstruction)),t}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let B=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],q={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function J(e){var t;if(void 0===e.candidates||0===e.candidates.length)return!1;let n=null===(t=e.candidates[0])||void 0===t?void 0:t.content;if(void 0===n||void 0===n.parts||0===n.parts.length)return!1;for(let e of n.parts)if(void 0===e||0===Object.keys(e).length||void 0!==e.text&&""===e.text)return!1;return!0}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let V="SILENT_ERROR";class W{constructor(e,t,n,s={}){this.model=t,this.params=n,this._requestOptions=s,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,(null==n?void 0:n.history)&&(function(e){let t=!1;for(let n of e){let{role:e,parts:s}=n;if(!t&&"user"!==e)throw new O(`First content should be with role 'user', got ${e}`);if(!v.includes(e))throw new O(`Each item should include role field. Got ${e} but valid roles are: ${JSON.stringify(v)}`);if(!Array.isArray(s))throw new O("Content should have 'parts' property with an array of Parts");if(0===s.length)throw new O("Each Content should have at least one part");let o={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(let e of s)for(let t of B)t in e&&(o[t]+=1);let i=q[e];for(let t of B)if(!i.includes(t)&&o[t]>0)throw new O(`Content with role '${e}' can't contain '${t}' part`);t=!0}}(n.history),this._history=n.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,t={}){var n,s,o,i,r,a;let l;await this._sendPromise;let c=Y(e),u={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(s=this.params)||void 0===s?void 0:s.generationConfig,tools:null===(o=this.params)||void 0===o?void 0:o.tools,toolConfig:null===(i=this.params)||void 0===i?void 0:i.toolConfig,systemInstruction:null===(r=this.params)||void 0===r?void 0:r.systemInstruction,cachedContent:null===(a=this.params)||void 0===a?void 0:a.cachedContent,contents:[...this._history,c]},d=Object.assign(Object.assign({},this._requestOptions),t);return this._sendPromise=this._sendPromise.then(()=>H(this._apiKey,this.model,u,d)).then(e=>{var t;if(J(e.response)){this._history.push(c);let n=Object.assign({parts:[],role:"model"},null===(t=e.response.candidates)||void 0===t?void 0:t[0].content);this._history.push(n)}else{let t=k(e.response);t&&console.warn(`sendMessage() was unsuccessful. ${t}. Inspect response object for details.`)}l=e}).catch(e=>{throw this._sendPromise=Promise.resolve(),e}),await this._sendPromise,l}async sendMessageStream(e,t={}){var n,s,o,i,r,a;await this._sendPromise;let l=Y(e),c={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(s=this.params)||void 0===s?void 0:s.generationConfig,tools:null===(o=this.params)||void 0===o?void 0:o.tools,toolConfig:null===(i=this.params)||void 0===i?void 0:i.toolConfig,systemInstruction:null===(r=this.params)||void 0===r?void 0:r.systemInstruction,cachedContent:null===(a=this.params)||void 0===a?void 0:a.cachedContent,contents:[...this._history,l]},u=Object.assign(Object.assign({},this._requestOptions),t),d=$(this._apiKey,this.model,c,u);return this._sendPromise=this._sendPromise.then(()=>d).catch(e=>{throw Error(V)}).then(e=>e.response).then(e=>{if(J(e)){this._history.push(l);let t=Object.assign({},e.candidates[0].content);t.role||(t.role="model"),this._history.push(t)}else{let t=k(e);t&&console.warn(`sendMessageStream() was unsuccessful. ${t}. Inspect response object for details.`)}}).catch(e=>{e.message!==V&&console.error(e)}),d}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function X(e,t,n,s){return(await T(t,p.COUNT_TOKENS,e,!1,JSON.stringify(n),s)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function z(e,t,n,s){return(await T(t,p.EMBED_CONTENT,e,!1,JSON.stringify(n),s)).json()}async function Q(e,t,n,s){let o=n.requests.map(e=>Object.assign(Object.assign({},e),{model:t}));return(await T(t,p.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:o}),s)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e,t,n={}){this.apiKey=e,this._requestOptions=n,t.model.includes("/")?this.model=t.model:this.model=`models/${t.model}`,this.generationConfig=t.generationConfig||{},this.safetySettings=t.safetySettings||[],this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=F(t.systemInstruction),this.cachedContent=t.cachedContent}async generateContent(e,t={}){var n;let s=K(e),o=Object.assign(Object.assign({},this._requestOptions),t);return H(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},s),o)}async generateContentStream(e,t={}){var n;let s=K(e),o=Object.assign(Object.assign({},this._requestOptions),t);return $(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},s),o)}startChat(e){var t;return new W(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(t=this.cachedContent)||void 0===t?void 0:t.name},e),this._requestOptions)}async countTokens(e,t={}){let n=function(e,t){var n;let s={model:null==t?void 0:t.model,generationConfig:null==t?void 0:t.generationConfig,safetySettings:null==t?void 0:t.safetySettings,tools:null==t?void 0:t.tools,toolConfig:null==t?void 0:t.toolConfig,systemInstruction:null==t?void 0:t.systemInstruction,cachedContent:null===(n=null==t?void 0:t.cachedContent)||void 0===n?void 0:n.name,contents:[]},o=null!=e.generateContentRequest;if(e.contents){if(o)throw new A("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=e.contents}else if(o)s=Object.assign(Object.assign({},s),e.generateContentRequest);else{let t=Y(e);s.contents=[t]}return{generateContentRequest:s}}(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),s=Object.assign(Object.assign({},this._requestOptions),t);return X(this.apiKey,this.model,n,s)}async embedContent(e,t={}){let n="string"==typeof e||Array.isArray(e)?{content:Y(e)}:e,s=Object.assign(Object.assign({},this._requestOptions),t);return z(this.apiKey,this.model,n,s)}async batchEmbedContents(e,t={}){let n=Object.assign(Object.assign({},this._requestOptions),t);return Q(this.apiKey,this.model,e,n)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ee{constructor(e){this.apiKey=e}getGenerativeModel(e,t){if(!e.model)throw new O("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new Z(this.apiKey,e,t)}getGenerativeModelFromCachedContent(e,t,n){if(!e.name)throw new A("Cached content must contain a `name` field.");if(!e.model)throw new A("Cached content must contain a `model` field.");for(let n of["model","systemInstruction"])if((null==t?void 0:t[n])&&e[n]&&(null==t?void 0:t[n])!==e[n]){if("model"===n&&(t.model.startsWith("models/")?t.model.replace("models/",""):t.model)===(e.model.startsWith("models/")?e.model.replace("models/",""):e.model))continue;throw new A(`Different value for "${n}" specified in modelParams (${t[n]}) and cachedContent (${e[n]})`)}let s=Object.assign(Object.assign({},t),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new Z(this.apiKey,s,n)}}var et=n(5256);let en=`You are Sakhi, the warm, concise AI companion for SakhiFi — an app for Indian students that blends money habits with everyday wellness.

SCOPE
- Personal finance for students in India: budgeting, saving, UPI safety, avoiding scams, small SIPs, emergency funds, part-time income, spending guilt (no shame).
- Wellness tied to student life: stress, sleep, energy, focus. For women and people who menstruate: be thoughtful about cycle-related mood shifts, PMS, cravings, fatigue — without claiming medical diagnosis.
- When they mention cravings (especially around periods): suggest practical swaps that are affordable in India and reasonably healthy (e.g. roasted makhana, chana, fruit, curd, homemade ladoos in moderation, eggs, nuts, seasonal fruit, vegetable poha/upma). Give rough budget context in INR when helpful.
- Tone: supportive, non-judgmental, gender-inclusive. Use "they" unless the user signals otherwise.

RULES
- You are NOT a doctor or therapist. If someone describes severe pain, heavy bleeding, self-harm, or crisis, urge them to contact a qualified professional or emergency services immediately.
- Do not give investment advice that promises returns; keep guidance educational and general.
- Keep replies readable on mobile: short paragraphs, bullet lists when useful. Default to under ~180 words unless the user asks for detail.
- If asked something outside finance/wellness/student life, answer briefly if safe, then gently steer back to how you can help with money or wellbeing.

LANGUAGE
- Default English; if the user writes in Hinglish or another Indian language, match their language mix when you can.

`,es="nodejs",eo="force-dynamic",ei=60,er=et.Ry({role:et.Km(["user","assistant"]),content:et.Z_().max(4e3)}),ea=et.Ry({messages:et.IX(er).min(1).max(36)});function el(e){if(!e)return"";let t=e.replace(/^\uFEFF/,"").trim();return(t.startsWith('"')&&t.endsWith('"')||t.startsWith("'")&&t.endsWith("'"))&&(t=t.slice(1,-1).trim()),t}let ec=["gemini-2.0-flash","gemini-1.5-flash","gemini-2.5-flash-preview-05-20"];async function eu(e){let t,n;let s=el(process.env.GEMINI_API_KEY),o=el(process.env.GEMINI_MODEL);if(!s)return C.NextResponse.json({error:"Chat is not configured. Add GEMINI_API_KEY in Vercel → Settings → Environment Variables (Production), then redeploy."},{status:503});try{t=await e.json()}catch{return C.NextResponse.json({error:"Invalid JSON"},{status:400})}let i=ea.safeParse(t);if(!i.success)return C.NextResponse.json({error:i.error.errors[0]?.message??"Invalid request"},{status:422});let{messages:r}=i.data,a=r.map(e=>({role:e.role,content:e.content.replace(/\0/g,"").trim().slice(0,4e3)}));if(!a.every(e=>e.content.length>0))return C.NextResponse.json({error:"Empty message"},{status:422});if(!function(e){if(0===e.length||"user"!==e[0].role||"user"!==e[e.length-1].role)return!1;for(let t=0;t<e.length;t++){let n=t%2==0?"user":"assistant";if(e[t].role!==n)return!1}return!0}(a))return C.NextResponse.json({error:"Messages must alternate user/assistant and end with user."},{status:422});let l=a[a.length-1].content,c=a.slice(0,-1).map(e=>({role:"assistant"===e.role?"model":"user",parts:[{text:e.content}]})),u=new ee(s),d=function(e){let t=[e?.trim(),...ec].filter(e=>!!e);return[...new Set(t)]}(o||void 0);for(let e of d)try{let t=u.getGenerativeModel({model:e,systemInstruction:en}).startChat({history:c}),s=(await t.sendMessage(l)).response.text();if(!s?.trim()){n=Error("Empty model response");continue}return C.NextResponse.json({reply:s.trim()},{headers:{"Cache-Control":"no-store"}})}catch(s){n=s;let t=s instanceof Error?s.message:"";if(/404|not found|not supported|invalid model|does not exist|ListModels/i.test(t)){console.warn(`[api/chat] model ${e} unavailable, trying next`);continue}break}let h=n instanceof Error?n.message:"Chat failed";return console.error("[api/chat]",h,{tried:d}),C.NextResponse.json({error:/404|not found|not supported|invalid model/i.test(h)?`No working Gemini model found. Tried: ${d.join(", ")}. In Google AI Studio, open a model that works with your key and set GEMINI_MODEL to that exact id, then redeploy.`:"Something went wrong. Try again in a moment."},{status:502})}let ed=new m.AppRouteRouteModule({definition:{kind:E.x.APP_ROUTE,page:"/api/chat/route",pathname:"/api/chat",filename:"route",bundlePath:"app/api/chat/route"},resolvedPagePath:"D:\\sakhifi\\src\\app\\api\\chat\\route.ts",nextConfigOutput:"",userland:g}),{requestAsyncStorage:eh,staticGenerationAsyncStorage:ef,serverHooks:ep,headerHooks:eg,staticGenerationBailout:em}=ed,eE="/api/chat/route";function ey(){return(0,y.patchFetch)({serverHooks:ep,staticGenerationAsyncStorage:ef})}},7347:e=>{var t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,s=Object.getOwnPropertyNames,o=Object.prototype.hasOwnProperty,i={};function r(e){var t;let n=["path"in e&&e.path&&`Path=${e.path}`,"expires"in e&&(e.expires||0===e.expires)&&`Expires=${("number"==typeof e.expires?new Date(e.expires):e.expires).toUTCString()}`,"maxAge"in e&&"number"==typeof e.maxAge&&`Max-Age=${e.maxAge}`,"domain"in e&&e.domain&&`Domain=${e.domain}`,"secure"in e&&e.secure&&"Secure","httpOnly"in e&&e.httpOnly&&"HttpOnly","sameSite"in e&&e.sameSite&&`SameSite=${e.sameSite}`,"partitioned"in e&&e.partitioned&&"Partitioned","priority"in e&&e.priority&&`Priority=${e.priority}`].filter(Boolean);return`${e.name}=${encodeURIComponent(null!=(t=e.value)?t:"")}; ${n.join("; ")}`}function a(e){let t=new Map;for(let n of e.split(/; */)){if(!n)continue;let e=n.indexOf("=");if(-1===e){t.set(n,"true");continue}let[s,o]=[n.slice(0,e),n.slice(e+1)];try{t.set(s,decodeURIComponent(null!=o?o:"true"))}catch{}}return t}function l(e){var t,n;if(!e)return;let[[s,o],...i]=a(e),{domain:r,expires:l,httponly:d,maxage:h,path:f,samesite:p,secure:g,partitioned:m,priority:E}=Object.fromEntries(i.map(([e,t])=>[e.toLowerCase(),t]));return function(e){let t={};for(let n in e)e[n]&&(t[n]=e[n]);return t}({name:s,value:decodeURIComponent(o),domain:r,...l&&{expires:new Date(l)},...d&&{httpOnly:!0},..."string"==typeof h&&{maxAge:Number(h)},path:f,...p&&{sameSite:c.includes(t=(t=p).toLowerCase())?t:void 0},...g&&{secure:!0},...E&&{priority:u.includes(n=(n=E).toLowerCase())?n:void 0},...m&&{partitioned:!0}})}((e,n)=>{for(var s in n)t(e,s,{get:n[s],enumerable:!0})})(i,{RequestCookies:()=>d,ResponseCookies:()=>h,parseCookie:()=>a,parseSetCookie:()=>l,stringifyCookie:()=>r}),e.exports=((e,i,r,a)=>{if(i&&"object"==typeof i||"function"==typeof i)for(let r of s(i))o.call(e,r)||void 0===r||t(e,r,{get:()=>i[r],enumerable:!(a=n(i,r))||a.enumerable});return e})(t({},"__esModule",{value:!0}),i);var c=["strict","lax","none"],u=["low","medium","high"],d=class{constructor(e){this._parsed=new Map,this._headers=e;let t=e.get("cookie");if(t)for(let[e,n]of a(t))this._parsed.set(e,{name:e,value:n})}[Symbol.iterator](){return this._parsed[Symbol.iterator]()}get size(){return this._parsed.size}get(...e){let t="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(t)}getAll(...e){var t;let n=Array.from(this._parsed);if(!e.length)return n.map(([e,t])=>t);let s="string"==typeof e[0]?e[0]:null==(t=e[0])?void 0:t.name;return n.filter(([e])=>e===s).map(([e,t])=>t)}has(e){return this._parsed.has(e)}set(...e){let[t,n]=1===e.length?[e[0].name,e[0].value]:e,s=this._parsed;return s.set(t,{name:t,value:n}),this._headers.set("cookie",Array.from(s).map(([e,t])=>r(t)).join("; ")),this}delete(e){let t=this._parsed,n=Array.isArray(e)?e.map(e=>t.delete(e)):t.delete(e);return this._headers.set("cookie",Array.from(t).map(([e,t])=>r(t)).join("; ")),n}clear(){return this.delete(Array.from(this._parsed.keys())),this}[Symbol.for("edge-runtime.inspect.custom")](){return`RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(e=>`${e.name}=${encodeURIComponent(e.value)}`).join("; ")}},h=class{constructor(e){var t,n,s;this._parsed=new Map,this._headers=e;let o=null!=(s=null!=(n=null==(t=e.getSetCookie)?void 0:t.call(e))?n:e.get("set-cookie"))?s:[];for(let e of Array.isArray(o)?o:function(e){if(!e)return[];var t,n,s,o,i,r=[],a=0;function l(){for(;a<e.length&&/\s/.test(e.charAt(a));)a+=1;return a<e.length}for(;a<e.length;){for(t=a,i=!1;l();)if(","===(n=e.charAt(a))){for(s=a,a+=1,l(),o=a;a<e.length&&"="!==(n=e.charAt(a))&&";"!==n&&","!==n;)a+=1;a<e.length&&"="===e.charAt(a)?(i=!0,a=o,r.push(e.substring(t,s)),t=a):a=s+1}else a+=1;(!i||a>=e.length)&&r.push(e.substring(t,e.length))}return r}(o)){let t=l(e);t&&this._parsed.set(t.name,t)}}get(...e){let t="string"==typeof e[0]?e[0]:e[0].name;return this._parsed.get(t)}getAll(...e){var t;let n=Array.from(this._parsed.values());if(!e.length)return n;let s="string"==typeof e[0]?e[0]:null==(t=e[0])?void 0:t.name;return n.filter(e=>e.name===s)}has(e){return this._parsed.has(e)}set(...e){let[t,n,s]=1===e.length?[e[0].name,e[0].value,e[0]]:e,o=this._parsed;return o.set(t,function(e={name:"",value:""}){return"number"==typeof e.expires&&(e.expires=new Date(e.expires)),e.maxAge&&(e.expires=new Date(Date.now()+1e3*e.maxAge)),(null===e.path||void 0===e.path)&&(e.path="/"),e}({name:t,value:n,...s})),function(e,t){for(let[,n]of(t.delete("set-cookie"),e)){let e=r(n);t.append("set-cookie",e)}}(o,this._headers),this}delete(...e){let[t,n,s]="string"==typeof e[0]?[e[0]]:[e[0].name,e[0].path,e[0].domain];return this.set({name:t,path:n,domain:s,value:"",expires:new Date(0)})}[Symbol.for("edge-runtime.inspect.custom")](){return`ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`}toString(){return[...this._parsed.values()].map(r).join("; ")}}},3608:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{RequestCookies:function(){return s.RequestCookies},ResponseCookies:function(){return s.ResponseCookies}});let s=n(7347)}};var t=require("../../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),s=t.X(0,[638,479,256],()=>n(1794));module.exports=s})();