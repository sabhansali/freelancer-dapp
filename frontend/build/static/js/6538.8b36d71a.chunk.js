"use strict";(globalThis.webpackChunkfreelancer_dapp_frontend||=[]).push([[6538],{66538(e,t,n){n.r(t),n.d(t,{PayController:()=>pe,W3mPayLoadingView:()=>$e,W3mPayQuoteView:()=>Ge,W3mPayView:()=>ge,arbitrumUSDC:()=>ot,arbitrumUSDT:()=>pt,baseETH:()=>nt,baseSepoliaETH:()=>st,baseUSDC:()=>it,ethereumUSDC:()=>at,ethereumUSDT:()=>lt,getExchanges:()=>Ve,getIsPaymentInProgress:()=>et,getPayError:()=>Xe,getPayResult:()=>Ze,openPay:()=>Ye,optimismUSDC:()=>rt,optimismUSDT:()=>dt,pay:()=>Je,polygonUSDC:()=>ct,polygonUSDT:()=>mt,solanaSOL:()=>gt,solanaUSDC:()=>ut,solanaUSDT:()=>ht});var i=n(37022),s=n(56370),a=n(56440),r=n(25015),o=n(17321),c=n(1348),u=n(61139),l=n(73609),d=n(93022),p=n(7258),m=n(89268),h=(n(92016),n(84107),n(10477),n(90616),n(42338),n(21311),n(45770),n(94582),n(43760),n(40135),n(84875),n(73777),n(30574)),g=n(76844),y=n(80883),w=n(71769),f=n(18833),b=n(79323),x=n(24657),k=n(86609),v=n(99251);const I="INVALID_PAYMENT_CONFIG",A="INVALID_RECIPIENT",S="INVALID_ASSET",P="INVALID_AMOUNT",C="UNKNOWN_ERROR",E="UNABLE_TO_INITIATE_PAYMENT",$="INVALID_CHAIN_NAMESPACE",N="GENERIC_PAYMENT_ERROR",T="UNABLE_TO_GET_EXCHANGES",q="ASSET_NOT_SUPPORTED",R="UNABLE_TO_GET_PAY_URL",U="UNABLE_TO_GET_BUY_STATUS",O="UNABLE_TO_GET_TOKEN_BALANCES",D="UNABLE_TO_GET_QUOTE",W="UNABLE_TO_GET_QUOTE_STATUS",F="INVALID_RECIPIENT_ADDRESS_FOR_ASSET",j={[I]:"Invalid payment configuration",[A]:"Invalid recipient address",[S]:"Invalid asset specified",[P]:"Invalid payment amount",[F]:"Invalid recipient address for the asset selected",[C]:"Unknown payment error occurred",[E]:"Unable to initiate payment",[$]:"Invalid chain namespace",[N]:"Unable to process payment",[T]:"Unable to get exchanges",[q]:"Asset not supported by the selected exchange",[R]:"Unable to get payment URL",[U]:"Unable to get buy status",[O]:"Unable to get token balances",[D]:"Unable to get quote. Please choose a different token",[W]:"Unable to get quote status"};class _ extends Error{get message(){return j[this.code]}constructor(e,t){super(j[e]),this.name="AppKitPayError",this.code=e,this.details=t,Error.captureStackTrace&&Error.captureStackTrace(this,_)}}var z=n(64564),L=n(71786),M=n(60205);const B="reown_test";var Q=n(23255),H=n(55851);function K(e){if(!e)return null;const t=e.steps[0];return t&&t.type===ue?t:null}function G(e,t=0){if(!e)return[];const n=e.steps.filter(e=>e.type===le),i=n.filter((e,n)=>n+1>t);return n.length>0&&n.length<3?i:[]}const Y=new z.Z({baseUrl:x.w.getApiUrl(),clientId:null});class J extends Error{}function V(){const{projectId:e,sdkType:t,sdkVersion:n}=L.H.state;return{projectId:e,st:t||"appkit",sv:n||"html-wagmi-4.2.2"}}async function Z(e,t){const n=`https://rpc.walletconnect.org/v1/json-rpc?projectId=${L.H.getSnapshot().projectId}`,{sdkType:i,sdkVersion:s,projectId:a}=L.H.getSnapshot(),r={jsonrpc:"2.0",id:1,method:e,params:{...t||{},st:i,sv:s,projectId:a}},o=await fetch(n,{method:"POST",body:JSON.stringify(r),headers:{"Content-Type":"application/json"}}),c=await o.json();if(c.error)throw new J(c.error.message);return c}async function X(e){return(await Z("reown_getExchanges",e)).result}async function ee(e){return(await Z("reown_getExchangePayUrl",e)).result}async function te(e){const t=v.y.isLowerCaseMatch(e.sourceToken.network,e.toToken.network),n=v.y.isLowerCaseMatch(e.sourceToken.asset,e.toToken.asset);return t&&n?async function({sourceToken:e,toToken:t,amount:n,recipient:i}){const s=d.x.parseUnits(n,e.metadata.decimals),a=d.x.parseUnits(n,t.metadata.decimals);return Promise.resolve({type:ce,origin:{amount:s?.toString()??"0",currency:e},destination:{amount:a?.toString()??"0",currency:t},fees:[{id:"service",label:"Service Fee",amount:"0",currency:t}],steps:[{requestId:ce,type:"deposit",deposit:{amount:s?.toString()??"0",currency:e.asset,receiver:i}}],timeInSeconds:6})}(e):async function(e){const t=f.S.bigNumber(e.amount).times(10**e.toToken.metadata.decimals).toString(),{chainId:n,chainNamespace:i}=w.C.parseCaipNetworkId(e.sourceToken.network),{chainId:s,chainNamespace:a}=w.C.parseCaipNetworkId(e.toToken.network),r="native"===e.sourceToken.asset?(0,M.NH)(i):e.sourceToken.asset,o="native"===e.toToken.asset?(0,M.NH)(a):e.toToken.asset;return await Y.post({path:"/appkit/v1/transfers/quote",body:{user:e.address,originChainId:n.toString(),originCurrency:r,destinationChainId:s.toString(),destinationCurrency:o,recipient:e.recipient,amount:t},params:V()})}(e)}const ne=["eip155","solana"],ie={eip155:{native:{assetNamespace:"slip44",assetReference:"60"},defaultTokenNamespace:"erc20"},solana:{native:{assetNamespace:"slip44",assetReference:"501"},defaultTokenNamespace:"token"}},se={56:"714",204:"714"};function ae(e,t){const{chainNamespace:n,chainId:i}=w.C.parseCaipNetworkId(e),s=ie[n];if(!s)throw new Error(`Unsupported chain namespace for CAIP-19 formatting: ${n}`);let a=s.native.assetNamespace,r=s.native.assetReference;"native"!==t?(a=s.defaultTokenNamespace,r=t):"eip155"===n&&se[i]&&(r=se[i]);return`${`${n}:${i}`}/${a}:${r}`}function re(e){const t=f.S.bigNumber(e,{safe:!0});return t.lt(.001)?"<0.001":t.round(4).toString()}const oe="unknown",ce="direct-transfer",ue="deposit",le="transaction",de=(0,h.BX)({paymentAsset:{network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},recipient:"0x0",amount:0,isConfigured:!1,error:null,isPaymentInProgress:!1,exchanges:[],isLoading:!1,openInNewTab:!0,redirectUrl:void 0,payWithExchange:void 0,currentPayment:void 0,analyticsSet:!1,paymentId:void 0,choice:"pay",tokenBalances:{[y.o.CHAIN.EVM]:[],[y.o.CHAIN.SOLANA]:[]},isFetchingTokenBalances:!1,selectedPaymentAsset:null,quote:void 0,quoteStatus:"waiting",quoteError:null,isFetchingQuote:!1,selectedExchange:void 0,exchangeUrlForQuote:void 0,requestId:void 0}),pe={state:de,subscribe:e=>(0,h.B1)(de,()=>e(de)),subscribeKey:(e,t)=>(0,g.u$)(de,e,t),async handleOpenPay(e){this.resetState(),this.setPaymentConfig(e),this.initializeAnalytics(),function(){const{chainNamespace:e}=w.C.parseCaipNetworkId(pe.state.paymentAsset.network);if(!x.w.isAddress(pe.state.recipient,e))throw new _(F,`Provide valid recipient address for namespace "${e}"`)}(),await this.prepareTokenLogo(),de.isConfigured=!0,b.E.sendEvent({type:"track",event:"PAY_MODAL_OPEN",properties:{exchanges:de.exchanges,configuration:{network:de.paymentAsset.network,asset:de.paymentAsset.asset,recipient:de.recipient,amount:de.amount}}}),await l.W.open({view:"Pay"})},resetState(){de.paymentAsset={network:"eip155:1",asset:"0x0",metadata:{name:"0x0",symbol:"0x0",decimals:0}},de.recipient="0x0",de.amount=0,de.isConfigured=!1,de.error=null,de.isPaymentInProgress=!1,de.isLoading=!1,de.currentPayment=void 0,de.selectedExchange=void 0,de.exchangeUrlForQuote=void 0,de.requestId=void 0},resetQuoteState(){de.quote=void 0,de.quoteStatus="waiting",de.quoteError=null,de.isFetchingQuote=!1,de.requestId=void 0},setPaymentConfig(e){if(!e.paymentAsset)throw new _(I);try{de.choice=e.choice??"pay",de.paymentAsset=e.paymentAsset,de.recipient=e.recipient,de.amount=e.amount,de.openInNewTab=e.openInNewTab??!0,de.redirectUrl=e.redirectUrl,de.payWithExchange=e.payWithExchange,de.error=null}catch(t){throw new _(I,t.message)}},setSelectedPaymentAsset(e){de.selectedPaymentAsset=e},setSelectedExchange(e){de.selectedExchange=e},setRequestId(e){de.requestId=e},setPaymentInProgress(e){de.isPaymentInProgress=e},getPaymentAsset:()=>de.paymentAsset,getExchanges:()=>de.exchanges,async fetchExchanges(){try{de.isLoading=!0;const e=await X({page:0});de.exchanges=e.exchanges.slice(0,2)}catch(e){throw p.P.showError(j.UNABLE_TO_GET_EXCHANGES),new _(T)}finally{de.isLoading=!1}},async getAvailableExchanges(e){try{const t=e?.asset&&e?.network?ae(e.network,e.asset):void 0;return await X({page:e?.page??0,asset:t,amount:e?.amount?.toString()})}catch(t){throw new _(T)}},async getPayUrl(e,t,n=!1){try{const i=Number(t.amount),s=await ee({exchangeId:e,asset:ae(t.network,t.asset),amount:i.toString(),recipient:`${t.network}:${t.recipient}`});return b.E.sendEvent({type:"track",event:"PAY_EXCHANGE_SELECTED",properties:{source:"pay",exchange:{id:e},configuration:{network:t.network,asset:t.asset,recipient:t.recipient,amount:i},currentPayment:{type:"exchange",exchangeId:e},headless:n}}),n&&(this.initiatePayment(),b.E.sendEvent({type:"track",event:"PAY_INITIATED",properties:{source:"pay",paymentId:de.paymentId||oe,configuration:{network:t.network,asset:t.asset,recipient:t.recipient,amount:i},currentPayment:{type:"exchange",exchangeId:e}}})),s}catch(i){if(i instanceof Error&&i.message.includes("is not supported"))throw new _(q);throw new Error(i.message)}},async generateExchangeUrlForQuote({exchangeId:e,paymentAsset:t,amount:n,recipient:i}){const s=await ee({exchangeId:e,asset:ae(t.network,t.asset),amount:n.toString(),recipient:i});de.exchangeSessionId=s.sessionId,de.exchangeUrlForQuote=s.url},async openPayUrl(e,t,n=!1){try{const i=await this.getPayUrl(e.exchangeId,t,n);if(!i)throw new _(R);const s=e.openInNewTab??!0?"_blank":"_self";return x.w.openHref(i.url,s),i}catch(i){throw de.error=i instanceof _?i.message:j.GENERIC_PAYMENT_ERROR,new _(R)}},async onTransfer({chainNamespace:e,fromAddress:t,toAddress:n,amount:i,paymentAsset:s}){if(de.currentPayment={type:"wallet",status:"IN_PROGRESS"},!de.isPaymentInProgress)try{this.initiatePayment();const a=o.W.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===s.network);if(!a)throw new Error("Target network not found");const r=o.W.state.activeCaipNetwork;switch(v.y.isLowerCaseMatch(r?.caipNetworkId,a.caipNetworkId)||await o.W.switchActiveNetwork(a),e){case y.o.CHAIN.EVM:"native"===s.asset&&(de.currentPayment.result=await async function(e,t,n){if(t!==y.o.CHAIN.EVM)throw new _($);if(!n.fromAddress)throw new _(I,"fromAddress is required for native EVM payments.");const i="string"===typeof n.amount?parseFloat(n.amount):n.amount;if(isNaN(i))throw new _(I);const s=e.metadata?.decimals??18,a=d.x.parseUnits(i.toString(),s);if("bigint"!==typeof a)throw new _(N);return await d.x.sendTransaction({chainNamespace:t,to:n.recipient,address:n.fromAddress,value:a,data:"0x"})??void 0}(s,e,{recipient:n,amount:i,fromAddress:t})),s.asset.startsWith("0x")&&(de.currentPayment.result=await async function(e,t){if(!t.fromAddress)throw new _(I,"fromAddress is required for ERC20 EVM payments.");const n=e.asset,i=t.recipient,s=Number(e.metadata.decimals),a=d.x.parseUnits(t.amount.toString(),s);if(void 0===a)throw new _(N);return await d.x.writeContract({fromAddress:t.fromAddress,tokenAddress:n,args:[i,a],method:"transfer",abi:Q.v.getERC20Abi(n),chainNamespace:y.o.CHAIN.EVM})??void 0}(s,{recipient:n,amount:i,fromAddress:t})),de.currentPayment.status="SUCCESS";break;case y.o.CHAIN.SOLANA:de.currentPayment.result=await async function(e,t){if(e!==y.o.CHAIN.SOLANA)throw new _($);if(!t.fromAddress)throw new _(I,"fromAddress is required for Solana payments.");const n="string"===typeof t.amount?parseFloat(t.amount):t.amount;if(isNaN(n)||n<=0)throw new _(I,"Invalid payment amount.");try{if(!H.G.getProvider(e))throw new _(N,"No Solana provider available.");const i=await d.x.sendTransaction({chainNamespace:y.o.CHAIN.SOLANA,to:t.recipient,value:n,tokenMint:t.tokenMint});if(!i)throw new _(N,"Transaction failed.");return i}catch(i){if(i instanceof _)throw i;throw new _(N,`Solana payment failed: ${i}`)}}(e,{recipient:n,amount:i,fromAddress:t,tokenMint:"native"===s.asset?void 0:s.asset}),de.currentPayment.status="SUCCESS";break;default:throw new _($)}}catch(a){throw de.error=a instanceof _?a.message:j.GENERIC_PAYMENT_ERROR,de.currentPayment.status="FAILED",p.P.showError(de.error),a}finally{de.isPaymentInProgress=!1}},async onSendTransaction(e){try{const{namespace:t,transactionStep:n}=e;pe.initiatePayment();const i=o.W.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===de.paymentAsset?.network);if(!i)throw new Error("Target network not found");const s=o.W.state.activeCaipNetwork;if(v.y.isLowerCaseMatch(s?.caipNetworkId,i.caipNetworkId)||await o.W.switchActiveNetwork(i),t===y.o.CHAIN.EVM){const{from:e,to:i,data:s,value:a}=n.transaction;await d.x.sendTransaction({address:e,to:i,data:s,value:BigInt(a),chainNamespace:t})}else if(t===y.o.CHAIN.SOLANA){const{instructions:e}=n.transaction;await d.x.writeSolanaTransaction({instructions:e})}}catch(t){throw de.error=t instanceof _?t.message:j.GENERIC_PAYMENT_ERROR,p.P.showError(de.error),t}finally{de.isPaymentInProgress=!1}},getExchangeById:e=>de.exchanges.find(t=>t.id===e),validatePayConfig(e){const{paymentAsset:t,recipient:n,amount:i}=e;if(!t)throw new _(I);if(!n)throw new _(A);if(!t.asset)throw new _(S);if(void 0===i||null===i||i<=0)throw new _(P)},async handlePayWithExchange(e){try{de.currentPayment={type:"exchange",exchangeId:e};const{network:t,asset:n}=de.paymentAsset,i={network:t,asset:n,amount:de.amount,recipient:de.recipient},s=await this.getPayUrl(e,i);if(!s)throw new _(E);return de.currentPayment.sessionId=s.sessionId,de.currentPayment.status="IN_PROGRESS",de.currentPayment.exchangeId=e,this.initiatePayment(),{url:s.url,openInNewTab:de.openInNewTab}}catch(t){return de.error=t instanceof _?t.message:j.GENERIC_PAYMENT_ERROR,de.isPaymentInProgress=!1,p.P.showError(de.error),null}},async getBuyStatus(e,t){try{const n=await async function(e){return(await Z("reown_getExchangeBuyStatus",e)).result}({sessionId:t,exchangeId:e});return"SUCCESS"!==n.status&&"FAILED"!==n.status||b.E.sendEvent({type:"track",event:"SUCCESS"===n.status?"PAY_SUCCESS":"PAY_ERROR",properties:{message:"FAILED"===n.status?x.w.parseError(de.error):void 0,source:"pay",paymentId:de.paymentId||oe,configuration:{network:de.paymentAsset.network,asset:de.paymentAsset.asset,recipient:de.recipient,amount:de.amount},currentPayment:{type:"exchange",exchangeId:de.currentPayment?.exchangeId,sessionId:de.currentPayment?.sessionId,result:n.txHash}}}),n}catch(n){throw new _(U)}},async fetchTokensFromEOA({caipAddress:e,caipNetwork:t,namespace:n}){if(!e)return[];const{address:i}=w.C.parseCaipAddress(e);let s=t;n===y.o.CHAIN.EVM&&(s=void 0);return await k.Z.getMyTokensWithBalance({address:i,caipNetwork:s})},async fetchTokensFromExchange(){if(!de.selectedExchange)return[];const e=await async function(e){return await Y.get({path:`/appkit/v1/transfers/assets/exchanges/${e}`,params:V()})}(de.selectedExchange.id),t=Object.values(e.assets).flat();return await Promise.all(t.map(async e=>{const t={chainId:(n=e).network,address:`${n.network}:${n.asset}`,symbol:n.metadata.symbol,name:n.metadata.name,iconUrl:n.metadata.logoURI||"",price:0,quantity:{numeric:"0",decimals:n.metadata.decimals.toString()}};var n;const{chainNamespace:i}=w.C.parseCaipNetworkId(t.chainId);let s=t.address;if(x.w.isCaipAddress(s)){const{address:e}=w.C.parseCaipAddress(s);s=e}const a=await c.$.getImageByToken(s??"",i).catch(()=>{});return t.iconUrl=a??"",t}))},async fetchTokens({caipAddress:e,caipNetwork:t,namespace:n}){try{de.isFetchingTokenBalances=!0;const i=Boolean(de.selectedExchange)?this.fetchTokensFromExchange():this.fetchTokensFromEOA({caipAddress:e,caipNetwork:t,namespace:n}),s=await i;de.tokenBalances={...de.tokenBalances,[n]:s}}catch(i){const e=i instanceof Error?i.message:"Unable to get token balances";p.P.showError(e)}finally{de.isFetchingTokenBalances=!1}},async fetchQuote({amount:e,address:t,sourceToken:n,toToken:i,recipient:s}){try{pe.resetQuoteState(),de.isFetchingQuote=!0;const a=await te({amount:e,address:de.selectedExchange?void 0:t,sourceToken:n,toToken:i,recipient:s});if(de.selectedExchange){const e=K(a);if(e){const t=`${n.network}:${e.deposit.receiver}`,i=f.S.formatNumber(e.deposit.amount,{decimals:n.metadata.decimals??0,round:8});await pe.generateExchangeUrlForQuote({exchangeId:de.selectedExchange.id,paymentAsset:n,amount:i.toString(),recipient:t})}}de.quote=a}catch(a){let e=j.UNABLE_TO_GET_QUOTE;if(a instanceof Error&&a.cause&&a.cause instanceof Response)try{const t=await a.cause.json();t.error&&"string"===typeof t.error&&(e=t.error)}catch{}throw de.quoteError=e,p.P.showError(e),new _(D)}finally{de.isFetchingQuote=!1}},async fetchQuoteStatus({requestId:e}){try{if(e===ce){const e=de.selectedExchange,t=de.exchangeSessionId;if(e&&t){switch((await this.getBuyStatus(e.id,t)).status){case"IN_PROGRESS":case"UNKNOWN":default:de.quoteStatus="waiting";break;case"SUCCESS":de.quoteStatus="success",de.isPaymentInProgress=!1;break;case"FAILED":de.quoteStatus="failure",de.isPaymentInProgress=!1}return}return void(de.quoteStatus="success")}const{status:t}=await async function(e){return await Y.get({path:"/appkit/v1/transfers/status",params:{requestId:e.requestId,...V()}})}({requestId:e});de.quoteStatus=t}catch{throw de.quoteStatus="failure",new _(W)}},initiatePayment(){de.isPaymentInProgress=!0,de.paymentId=crypto.randomUUID()},initializeAnalytics(){de.analyticsSet||(de.analyticsSet=!0,this.subscribeKey("isPaymentInProgress",e=>{if(de.currentPayment?.status&&"UNKNOWN"!==de.currentPayment.status){const e={IN_PROGRESS:"PAY_INITIATED",SUCCESS:"PAY_SUCCESS",FAILED:"PAY_ERROR"}[de.currentPayment.status];b.E.sendEvent({type:"track",event:e,properties:{message:"FAILED"===de.currentPayment.status?x.w.parseError(de.error):void 0,source:"pay",paymentId:de.paymentId||oe,configuration:{network:de.paymentAsset.network,asset:de.paymentAsset.asset,recipient:de.recipient,amount:de.amount},currentPayment:{type:de.currentPayment.type,exchangeId:de.currentPayment.exchangeId,sessionId:de.currentPayment.sessionId,result:de.currentPayment.result}}})}}))},async prepareTokenLogo(){if(!de.paymentAsset.metadata.logoURI)try{const{chainNamespace:e}=w.C.parseCaipNetworkId(de.paymentAsset.network),t=await c.$.getImageByToken(de.paymentAsset.asset,e);de.paymentAsset.metadata.logoURI=t}catch{}}},me=m.AH`
  wui-separator {
    margin: var(--apkt-spacing-3) calc(var(--apkt-spacing-3) * -1) var(--apkt-spacing-2)
      calc(var(--apkt-spacing-3) * -1);
    width: calc(100% + var(--apkt-spacing-3) * 2);
  }

  .token-display {
    padding: var(--apkt-spacing-3) var(--apkt-spacing-3);
    border-radius: var(--apkt-borderRadius-5);
    background-color: var(--apkt-tokens-theme-backgroundPrimary);
    margin-top: var(--apkt-spacing-3);
    margin-bottom: var(--apkt-spacing-3);
  }

  .token-display wui-text {
    text-transform: none;
  }

  wui-loading-spinner {
    padding: var(--apkt-spacing-2);
  }

  .left-image-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .token-image {
    border-radius: ${({borderRadius:e})=>e.round};
    width: 40px;
    height: 40px;
  }

  .chain-image {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: -3px;
    right: -5px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .payment-methods-container {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:e})=>e[8]};
    border-top-left-radius: ${({borderRadius:e})=>e[8]};
  }
`;var he=function(e,t,n,i){var s,a=arguments.length,r=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(r=(a<3?s(r):a>3?s(t,n,r):s(t,n))||r);return a>3&&r&&Object.defineProperty(t,n,r),r};let ge=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.amount=pe.state.amount,this.namespace=void 0,this.paymentAsset=pe.state.paymentAsset,this.activeConnectorIds=r.a.state.activeConnectorIds,this.caipAddress=void 0,this.exchanges=pe.state.exchanges,this.isLoading=pe.state.isLoading,this.initializeNamespace(),this.unsubscribe.push(pe.subscribeKey("amount",e=>this.amount=e)),this.unsubscribe.push(r.a.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e)),this.unsubscribe.push(pe.subscribeKey("exchanges",e=>this.exchanges=e)),this.unsubscribe.push(pe.subscribeKey("isLoading",e=>this.isLoading=e)),pe.fetchExchanges(),pe.setSelectedExchange(void 0)}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return i.qy`
      <wui-flex flexDirection="column">
        ${this.paymentDetailsTemplate()} ${this.paymentMethodsTemplate()}
      </wui-flex>
    `}paymentMethodsTemplate(){return i.qy`
      <wui-flex flexDirection="column" padding="3" gap="2" class="payment-methods-container">
        ${this.payWithWalletTemplate()} ${this.templateSeparator()}
        ${this.templateExchangeOptions()}
      </wui-flex>
    `}initializeNamespace(){const e=o.W.state.activeChain;this.namespace=e,this.caipAddress=o.W.getAccountData(e)?.caipAddress,this.unsubscribe.push(o.W.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress},e))}paymentDetailsTemplate(){const e=o.W.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.paymentAsset.network);return i.qy`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        .padding=${["6","8","6","8"]}
        gap="2"
      >
        <wui-flex alignItems="center" gap="1">
          <wui-text variant="h1-regular" color="primary">
            ${re(this.amount||"0")}
          </wui-text>

          <wui-flex flexDirection="column">
            <wui-text variant="h6-regular" color="secondary">
              ${this.paymentAsset.metadata.symbol||"Unknown"}
            </wui-text>
            <wui-text variant="md-medium" color="secondary"
              >on ${e?.name||"Unknown"}</wui-text
            >
          </wui-flex>
        </wui-flex>

        <wui-flex class="left-image-container">
          <wui-image
            src=${(0,a.J)(this.paymentAsset.metadata.logoURI)}
            class="token-image"
          ></wui-image>
          <wui-image
            src=${(0,a.J)(c.$.getNetworkImage(e))}
            class="chain-image"
          ></wui-image>
        </wui-flex>
      </wui-flex>
    `}payWithWalletTemplate(){return function(e){const{chainNamespace:t}=w.C.parseCaipNetworkId(e);return ne.includes(t)}(this.paymentAsset.network)?this.caipAddress?this.connectedWalletTemplate():this.disconnectedWalletTemplate():i.qy``}connectedWalletTemplate(){const{name:e,image:t}=this.getWalletProperties({namespace:this.namespace});return i.qy`
      <wui-flex flexDirection="column" gap="3">
        <wui-list-item
          type="secondary"
          boxColor="foregroundSecondary"
          @click=${this.onWalletPayment}
          .boxed=${!1}
          ?chevron=${!0}
          ?fullSize=${!1}
          ?rounded=${!0}
          data-testid="wallet-payment-option"
          imageSrc=${(0,a.J)(t)}
          imageSize="3xl"
        >
          <wui-text variant="lg-regular" color="primary">Pay with ${e}</wui-text>
        </wui-list-item>

        <wui-list-item
          type="secondary"
          icon="power"
          iconColor="error"
          @click=${this.onDisconnect}
          data-testid="disconnect-button"
          ?chevron=${!1}
          boxColor="foregroundSecondary"
        >
          <wui-text variant="lg-regular" color="secondary">Disconnect</wui-text>
        </wui-list-item>
      </wui-flex>
    `}disconnectedWalletTemplate(){return i.qy`<wui-list-item
      type="secondary"
      boxColor="foregroundSecondary"
      variant="icon"
      iconColor="default"
      iconVariant="overlay"
      icon="wallet"
      @click=${this.onWalletPayment}
      ?chevron=${!0}
      data-testid="wallet-payment-option"
    >
      <wui-text variant="lg-regular" color="primary">Pay with wallet</wui-text>
    </wui-list-item>`}templateExchangeOptions(){if(this.isLoading)return i.qy`<wui-flex justifyContent="center" alignItems="center">
        <wui-loading-spinner size="md"></wui-loading-spinner>
      </wui-flex>`;const e=this.exchanges.filter(e=>function(e){const t=o.W.getAllRequestedCaipNetworks().find(t=>t.caipNetworkId===e.network);return!!t&&Boolean(t.testnet)}(this.paymentAsset)?e.id===B:e.id!==B);return 0===e.length?i.qy`<wui-flex justifyContent="center" alignItems="center">
        <wui-text variant="md-medium" color="primary">No exchanges available</wui-text>
      </wui-flex>`:e.map(e=>i.qy`
        <wui-list-item
          type="secondary"
          boxColor="foregroundSecondary"
          @click=${()=>this.onExchangePayment(e)}
          data-testid="exchange-option-${e.id}"
          ?chevron=${!0}
          imageSrc=${(0,a.J)(e.imageUrl)}
        >
          <wui-text flexGrow="1" variant="lg-regular" color="primary">
            Pay with ${e.name}
          </wui-text>
        </wui-list-item>
      `)}templateSeparator(){return i.qy`<wui-separator text="or" bgColor="secondary"></wui-separator>`}async onWalletPayment(){if(!this.namespace)throw new Error("Namespace not found");this.caipAddress?u.I.push("PayQuote"):(await r.a.connect(),await l.W.open({view:"PayQuote"}))}onExchangePayment(e){pe.setSelectedExchange(e),u.I.push("PayQuote")}async onDisconnect(){try{await d.x.disconnect(),await l.W.open({view:"Pay"})}catch{console.error("Failed to disconnect"),p.P.showError("Failed to disconnect")}}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};const t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};const n=r.a.getConnector({id:t,namespace:e});if(!n)return{name:void 0,image:void 0};const i=c.$.getConnectorImage(n);return{name:n.name,image:i}}};ge.styles=me,he([(0,s.wk)()],ge.prototype,"amount",void 0),he([(0,s.wk)()],ge.prototype,"namespace",void 0),he([(0,s.wk)()],ge.prototype,"paymentAsset",void 0),he([(0,s.wk)()],ge.prototype,"activeConnectorIds",void 0),he([(0,s.wk)()],ge.prototype,"caipAddress",void 0),he([(0,s.wk)()],ge.prototype,"exchanges",void 0),he([(0,s.wk)()],ge.prototype,"isLoading",void 0),ge=he([(0,m.EM)("w3m-pay-view")],ge);var ye=n(41286),we=n(89406),fe=n(39446),be=n(37845);const xe=we.AH`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-container {
    position: relative;
    width: var(--pulse-size);
    height: var(--pulse-size);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pulse-rings {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .pulse-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid var(--pulse-color);
    opacity: 0;
    animation: pulse var(--pulse-duration, 2s) ease-out infinite;
  }

  .pulse-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: var(--pulse-opacity, 0.3);
    }
    50% {
      opacity: calc(var(--pulse-opacity, 0.3) * 0.5);
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`;var ke=function(e,t,n,i){var s,a=arguments.length,r=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(r=(a<3?s(r):a>3?s(t,n,r):s(t,n))||r);return a>3&&r&&Object.defineProperty(t,n,r),r};const ve={"accent-primary":we.f.tokens.core.backgroundAccentPrimary};let Ie=class extends i.WF{constructor(){super(...arguments),this.rings=3,this.duration=2,this.opacity=.3,this.size="200px",this.variant="accent-primary"}render(){const e=ve[this.variant];this.style.cssText=`\n      --pulse-size: ${this.size};\n      --pulse-duration: ${this.duration}s;\n      --pulse-color: ${e};\n      --pulse-opacity: ${this.opacity};\n    `;const t=Array.from({length:this.rings},(e,t)=>this.renderRing(t,this.rings));return i.qy`
      <div class="pulse-container">
        <div class="pulse-rings">${t}</div>
        <div class="pulse-content">
          <slot></slot>
        </div>
      </div>
    `}renderRing(e,t){const n=`animation-delay: ${e/t*this.duration}s;`;return i.qy`<div class="pulse-ring" style=${n}></div>`}};Ie.styles=[fe.W5,xe],ke([(0,s.MZ)({type:Number})],Ie.prototype,"rings",void 0),ke([(0,s.MZ)({type:Number})],Ie.prototype,"duration",void 0),ke([(0,s.MZ)({type:Number})],Ie.prototype,"opacity",void 0),ke([(0,s.MZ)()],Ie.prototype,"size",void 0),ke([(0,s.MZ)()],Ie.prototype,"variant",void 0),Ie=ke([(0,be.E)("wui-pulse")],Ie);const Ae=[{id:"received",title:"Receiving funds",icon:"dollar"},{id:"processing",title:"Swapping asset",icon:"recycleHorizontal"},{id:"sending",title:"Sending asset to the recipient address",icon:"send"}],Se=["success","submitted","failure","timeout","refund"],Pe=m.AH`
  :host {
    display: block;
    height: 100%;
    width: 100%;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }

  .token-badge-container {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: ${({borderRadius:e})=>e[4]};
    z-index: 3;
    min-width: 105px;
  }

  .token-badge-container.loading {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border: 3px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .token-badge-container.success {
    background-color: ${({tokens:e})=>e.theme.backgroundPrimary};
    border: 3px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  .token-image-container {
    position: relative;
  }

  .token-image {
    border-radius: ${({borderRadius:e})=>e.round};
    width: 64px;
    height: 64px;
  }

  .token-image.success {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .token-image.error {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .token-image.loading {
    background: ${({colors:e})=>e.accent010};
  }

  .token-image wui-icon {
    width: 32px;
    height: 32px;
  }

  .token-badge {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border: 1px solid ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[4]};
  }

  .token-badge wui-text {
    white-space: nowrap;
  }

  .payment-lifecycle-container {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:e})=>e[6]};
    border-top-left-radius: ${({borderRadius:e})=>e[6]};
  }

  .payment-step-badge {
    padding: ${({spacing:e})=>e[1]} ${({spacing:e})=>e[2]};
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  .payment-step-badge.loading {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  .payment-step-badge.error {
    background-color: ${({tokens:e})=>e.core.backgroundError};
  }

  .payment-step-badge.success {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
  }

  .step-icon-container {
    position: relative;
    height: 40px;
    width: 40px;
    border-radius: ${({borderRadius:e})=>e.round};
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  .step-icon-box {
    position: absolute;
    right: -4px;
    bottom: -1px;
    padding: 2px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .step-icon-box.success {
    background-color: ${({tokens:e})=>e.core.backgroundSuccess};
  }
`;var Ce=function(e,t,n,i){var s,a=arguments.length,r=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(r=(a<3?s(r):a>3?s(t,n,r):s(t,n))||r);return a>3&&r&&Object.defineProperty(t,n,r),r};const Ee={received:["pending","success","submitted"],processing:["success","submitted"],sending:["success","submitted"]};let $e=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.pollingInterval=null,this.paymentAsset=pe.state.paymentAsset,this.quoteStatus=pe.state.quoteStatus,this.quote=pe.state.quote,this.amount=pe.state.amount,this.namespace=void 0,this.caipAddress=void 0,this.profileName=null,this.activeConnectorIds=r.a.state.activeConnectorIds,this.selectedExchange=pe.state.selectedExchange,this.initializeNamespace(),this.unsubscribe.push(pe.subscribeKey("quoteStatus",e=>this.quoteStatus=e),pe.subscribeKey("quote",e=>this.quote=e),r.a.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e),pe.subscribeKey("selectedExchange",e=>this.selectedExchange=e))}connectedCallback(){super.connectedCallback(),this.startPolling()}disconnectedCallback(){super.disconnectedCallback(),this.stopPolling(),this.unsubscribe.forEach(e=>e())}render(){return i.qy`
      <wui-flex flexDirection="column" .padding=${["3","0","0","0"]} gap="2">
        ${this.tokenTemplate()} ${this.paymentTemplate()} ${this.paymentLifecycleTemplate()}
      </wui-flex>
    `}tokenTemplate(){const e=re(this.amount||"0"),t=this.paymentAsset.metadata.symbol??"Unknown",n=o.W.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.paymentAsset.network),s="failure"===this.quoteStatus||"timeout"===this.quoteStatus||"refund"===this.quoteStatus;return"success"===this.quoteStatus||"submitted"===this.quoteStatus?i.qy`<wui-flex alignItems="center" justifyContent="center">
        <wui-flex justifyContent="center" alignItems="center" class="token-image success">
          <wui-icon name="checkmark" color="success" size="inherit"></wui-icon>
        </wui-flex>
      </wui-flex>`:s?i.qy`<wui-flex alignItems="center" justifyContent="center">
        <wui-flex justifyContent="center" alignItems="center" class="token-image error">
          <wui-icon name="close" color="error" size="inherit"></wui-icon>
        </wui-flex>
      </wui-flex>`:i.qy`
      <wui-flex alignItems="center" justifyContent="center">
        <wui-flex class="token-image-container">
          <wui-pulse size="125px" rings="3" duration="4" opacity="0.5" variant="accent-primary">
            <wui-flex justifyContent="center" alignItems="center" class="token-image loading">
              <wui-icon name="paperPlaneTitle" color="accent-primary" size="inherit"></wui-icon>
            </wui-flex>
          </wui-pulse>

          <wui-flex
            justifyContent="center"
            alignItems="center"
            class="token-badge-container loading"
          >
            <wui-flex
              alignItems="center"
              justifyContent="center"
              gap="01"
              padding="1"
              class="token-badge"
            >
              <wui-image
                src=${(0,a.J)(c.$.getNetworkImage(n))}
                class="chain-image"
                size="mdl"
              ></wui-image>

              <wui-text variant="lg-regular" color="primary">${e} ${t}</wui-text>
            </wui-flex>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}paymentTemplate(){return i.qy`
      <wui-flex flexDirection="column" gap="2" .padding=${["0","6","0","6"]}>
        ${this.renderPayment()}
        <wui-separator></wui-separator>
        ${this.renderWallet()}
      </wui-flex>
    `}paymentLifecycleTemplate(){const e=this.getStepsWithStatus();return i.qy`
      <wui-flex flexDirection="column" padding="4" gap="2" class="payment-lifecycle-container">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">PAYMENT CYCLE</wui-text>

          ${this.renderPaymentCycleBadge()}
        </wui-flex>

        <wui-flex flexDirection="column" gap="5" .padding=${["2","0","2","0"]}>
          ${e.map(e=>this.renderStep(e))}
        </wui-flex>
      </wui-flex>
    `}renderPaymentCycleBadge(){const e="failure"===this.quoteStatus||"timeout"===this.quoteStatus||"refund"===this.quoteStatus,t="success"===this.quoteStatus||"submitted"===this.quoteStatus;if(e)return i.qy`
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge error"
          gap="1"
        >
          <wui-icon name="close" color="error" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="error">Failed</wui-text>
        </wui-flex>
      `;if(t)return i.qy`
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge success"
          gap="1"
        >
          <wui-icon name="checkmark" color="success" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="success">Completed</wui-text>
        </wui-flex>
      `;const n=this.quote?.timeInSeconds??0;return i.qy`
      <wui-flex alignItems="center" justifyContent="space-between" gap="3">
        <wui-flex
          justifyContent="center"
          alignItems="center"
          class="payment-step-badge loading"
          gap="1"
        >
          <wui-icon name="clock" color="default" size="xs"></wui-icon>
          <wui-text variant="sm-regular" color="primary">Est. ${n} sec</wui-text>
        </wui-flex>

        <wui-icon name="chevronBottom" color="default" size="xxs"></wui-icon>
      </wui-flex>
    `}renderPayment(){const e=o.W.getAllRequestedCaipNetworks().find(e=>{const t=this.quote?.origin.currency.network;if(!t)return!1;const{chainId:n}=w.C.parseCaipNetworkId(t);return v.y.isLowerCaseMatch(e.id.toString(),n.toString())}),t=re(f.S.formatNumber(this.quote?.origin.amount||"0",{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString()),n=this.quote?.origin.currency.metadata.symbol??"Unknown";return i.qy`
      <wui-flex
        alignItems="flex-start"
        justifyContent="space-between"
        .padding=${["3","0","3","0"]}
      >
        <wui-text variant="lg-regular" color="secondary">Payment Method</wui-text>

        <wui-flex flexDirection="column" alignItems="flex-end" gap="1">
          <wui-flex alignItems="center" gap="01">
            <wui-text variant="lg-regular" color="primary">${t}</wui-text>
            <wui-text variant="lg-regular" color="secondary">${n}</wui-text>
          </wui-flex>

          <wui-flex alignItems="center" gap="1">
            <wui-text variant="md-regular" color="secondary">on</wui-text>
            <wui-image
              src=${(0,a.J)(c.$.getNetworkImage(e))}
              size="xs"
            ></wui-image>
            <wui-text variant="md-regular" color="secondary">${e?.name}</wui-text>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}renderWallet(){return i.qy`
      <wui-flex
        alignItems="flex-start"
        justifyContent="space-between"
        .padding=${["3","0","3","0"]}
      >
        <wui-text variant="lg-regular" color="secondary"
          >${this.selectedExchange?"Exchange":"Wallet"}</wui-text
        >

        ${this.renderWalletText()}
      </wui-flex>
    `}renderWalletText(){const{image:e}=this.getWalletProperties({namespace:this.namespace}),{address:t}=this.caipAddress?w.C.parseCaipAddress(this.caipAddress):{},n=this.selectedExchange?.name;return this.selectedExchange?i.qy`
        <wui-flex alignItems="center" justifyContent="flex-end" gap="1">
          <wui-text variant="lg-regular" color="primary">${n}</wui-text>
          <wui-image src=${(0,a.J)(this.selectedExchange.imageUrl)} size="mdl"></wui-image>
        </wui-flex>
      `:i.qy`
      <wui-flex alignItems="center" justifyContent="flex-end" gap="1">
        <wui-text variant="lg-regular" color="primary">
          ${m.Zv.getTruncateString({string:this.profileName||t||n||"",charsStart:this.profileName?16:4,charsEnd:this.profileName?0:6,truncate:this.profileName?"end":"middle"})}
        </wui-text>

        <wui-image src=${(0,a.J)(e)} size="mdl"></wui-image>
      </wui-flex>
    `}getStepsWithStatus(){return"failure"===this.quoteStatus||"timeout"===this.quoteStatus||"refund"===this.quoteStatus?Ae.map(e=>({...e,status:"failed"})):Ae.map(e=>{const t=(Ee[e.id]??[]).includes(this.quoteStatus)?"completed":"pending";return{...e,status:t}})}renderStep({title:e,icon:t,status:n}){const s={"step-icon-box":!0,success:"completed"===n};return i.qy`
      <wui-flex alignItems="center" gap="3">
        <wui-flex justifyContent="center" alignItems="center" class="step-icon-container">
          <wui-icon name=${t} color="default" size="mdl"></wui-icon>

          <wui-flex alignItems="center" justifyContent="center" class=${(0,ye.H)(s)}>
            ${this.renderStatusIndicator(n)}
          </wui-flex>
        </wui-flex>

        <wui-text variant="md-regular" color="primary">${e}</wui-text>
      </wui-flex>
    `}renderStatusIndicator(e){return"completed"===e?i.qy`<wui-icon size="sm" color="success" name="checkmark"></wui-icon>`:"failed"===e?i.qy`<wui-icon size="sm" color="error" name="close"></wui-icon>`:"pending"===e?i.qy`<wui-loading-spinner color="accent-primary" size="sm"></wui-loading-spinner>`:null}startPolling(){this.pollingInterval||(this.fetchQuoteStatus(),this.pollingInterval=setInterval(()=>{this.fetchQuoteStatus()},3e3))}stopPolling(){this.pollingInterval&&(clearInterval(this.pollingInterval),this.pollingInterval=null)}async fetchQuoteStatus(){const e=pe.state.requestId;if(!e||Se.includes(this.quoteStatus))this.stopPolling();else try{await pe.fetchQuoteStatus({requestId:e}),Se.includes(this.quoteStatus)&&this.stopPolling()}catch{this.stopPolling()}}initializeNamespace(){const e=o.W.state.activeChain;this.namespace=e,this.caipAddress=o.W.getAccountData(e)?.caipAddress,this.profileName=o.W.getAccountData(e)?.profileName??null,this.unsubscribe.push(o.W.subscribeChainProp("accountState",e=>{this.caipAddress=e?.caipAddress,this.profileName=e?.profileName??null},e))}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};const t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};const n=r.a.getConnector({id:t,namespace:e});if(!n)return{name:void 0,image:void 0};const i=c.$.getConnectorImage(n);return{name:n.name,image:i}}};$e.styles=Pe,Ce([(0,s.wk)()],$e.prototype,"paymentAsset",void 0),Ce([(0,s.wk)()],$e.prototype,"quoteStatus",void 0),Ce([(0,s.wk)()],$e.prototype,"quote",void 0),Ce([(0,s.wk)()],$e.prototype,"amount",void 0),Ce([(0,s.wk)()],$e.prototype,"namespace",void 0),Ce([(0,s.wk)()],$e.prototype,"caipAddress",void 0),Ce([(0,s.wk)()],$e.prototype,"profileName",void 0),Ce([(0,s.wk)()],$e.prototype,"activeConnectorIds",void 0),Ce([(0,s.wk)()],$e.prototype,"selectedExchange",void 0),$e=Ce([(0,m.EM)("w3m-pay-loading-view")],$e);n(3417),n(63625);const Ne=i.AH`
  :host {
    display: block;
  }
`;var Te=function(e,t,n,i){var s,a=arguments.length,r=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(r=(a<3?s(r):a>3?s(t,n,r):s(t,n))||r);return a>3&&r&&Object.defineProperty(t,n,r),r};let qe=class extends i.WF{render(){return i.qy`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Pay</wui-text>
          <wui-shimmer width="60px" height="16px" borderRadius="4xs" variant="light"></wui-shimmer>
        </wui-flex>

        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Network Fee</wui-text>

          <wui-flex flexDirection="column" alignItems="flex-end" gap="2">
            <wui-shimmer
              width="75px"
              height="16px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>

            <wui-flex alignItems="center" gap="01">
              <wui-shimmer width="14px" height="14px" rounded variant="light"></wui-shimmer>
              <wui-shimmer
                width="49px"
                height="14px"
                borderRadius="4xs"
                variant="light"
              ></wui-shimmer>
            </wui-flex>
          </wui-flex>
        </wui-flex>

        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Service Fee</wui-text>
          <wui-shimmer width="75px" height="16px" borderRadius="4xs" variant="light"></wui-shimmer>
        </wui-flex>
      </wui-flex>
    `}};qe.styles=[Ne],qe=Te([(0,m.EM)("w3m-pay-fees-skeleton")],qe);const Re=m.AH`
  :host {
    display: block;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }
`;var Ue=function(e,t,n,i){var s,a=arguments.length,r=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(r=(a<3?s(r):a>3?s(t,n,r):s(t,n))||r);return a>3&&r&&Object.defineProperty(t,n,r),r};let Oe=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.quote=pe.state.quote,this.unsubscribe.push(pe.subscribeKey("quote",e=>this.quote=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=f.S.formatNumber(this.quote?.origin.amount||"0",{decimals:this.quote?.origin.currency.metadata.decimals??0,round:6}).toString();return i.qy`
      <wui-flex flexDirection="column" gap="4">
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">Pay</wui-text>
          <wui-text variant="md-regular" color="primary">
            ${e} ${this.quote?.origin.currency.metadata.symbol||"Unknown"}
          </wui-text>
        </wui-flex>

        ${this.quote&&this.quote.fees.length>0?this.quote.fees.map(e=>this.renderFee(e)):null}
      </wui-flex>
    `}renderFee(e){const t="network"===e.id,n=f.S.formatNumber(e.amount||"0",{decimals:e.currency.metadata.decimals??0,round:6}).toString();if(t){const t=o.W.getAllRequestedCaipNetworks().find(t=>v.y.isLowerCaseMatch(t.caipNetworkId,e.currency.network));return i.qy`
        <wui-flex alignItems="center" justifyContent="space-between">
          <wui-text variant="md-regular" color="secondary">${e.label}</wui-text>

          <wui-flex flexDirection="column" alignItems="flex-end" gap="2">
            <wui-text variant="md-regular" color="primary">
              ${n} ${e.currency.metadata.symbol||"Unknown"}
            </wui-text>

            <wui-flex alignItems="center" gap="01">
              <wui-image
                src=${(0,a.J)(c.$.getNetworkImage(t))}
                size="xs"
              ></wui-image>
              <wui-text variant="sm-regular" color="secondary">
                ${t?.name||"Unknown"}
              </wui-text>
            </wui-flex>
          </wui-flex>
        </wui-flex>
      `}return i.qy`
      <wui-flex alignItems="center" justifyContent="space-between">
        <wui-text variant="md-regular" color="secondary">${e.label}</wui-text>
        <wui-text variant="md-regular" color="primary">
          ${n} ${e.currency.metadata.symbol||"Unknown"}
        </wui-text>
      </wui-flex>
    `}};Oe.styles=[Re],Ue([(0,s.wk)()],Oe.prototype,"quote",void 0),Oe=Ue([(0,m.EM)("w3m-pay-fees")],Oe);const De=m.AH`
  :host {
    display: block;
    width: 100%;
  }

  .disabled-container {
    padding: ${({spacing:e})=>e[2]};
    min-height: 168px;
  }

  wui-icon {
    width: ${({spacing:e})=>e[8]};
    height: ${({spacing:e})=>e[8]};
  }

  wui-flex > wui-text {
    max-width: 273px;
  }
`;var We=function(e,t,n,i){var s,a=arguments.length,r=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(r=(a<3?s(r):a>3?s(t,n,r):s(t,n))||r);return a>3&&r&&Object.defineProperty(t,n,r),r};let Fe=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.selectedExchange=pe.state.selectedExchange,this.unsubscribe.push(pe.subscribeKey("selectedExchange",e=>this.selectedExchange=e))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=Boolean(this.selectedExchange);return i.qy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
        class="disabled-container"
      >
        <wui-icon name="coins" color="default" size="inherit"></wui-icon>

        <wui-text variant="md-regular" color="primary" align="center">
          You don't have enough funds to complete this transaction
        </wui-text>

        ${e?null:i.qy`<wui-button
              size="md"
              variant="neutral-secondary"
              @click=${this.dispatchConnectOtherWalletEvent.bind(this)}
              >Connect other wallet</wui-button
            >`}
      </wui-flex>
    `}dispatchConnectOtherWalletEvent(){this.dispatchEvent(new CustomEvent("connectOtherWallet",{detail:!0,bubbles:!0,composed:!0}))}};Fe.styles=[De],We([(0,s.MZ)({type:Array})],Fe.prototype,"selectedExchange",void 0),Fe=We([(0,m.EM)("w3m-pay-options-empty")],Fe);const je=m.AH`
  :host {
    display: block;
    width: 100%;
  }

  .pay-options-container {
    max-height: 196px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  .pay-options-container::-webkit-scrollbar {
    display: none;
  }

  .pay-option-container {
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: ${({spacing:e})=>e[3]};
    min-height: 60px;
  }

  .token-images-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .chain-image {
    position: absolute;
    bottom: -3px;
    right: -5px;
    border: 2px solid ${({tokens:e})=>e.theme.foregroundSecondary};
  }
`;var _e=function(e,t,n,i){var s,a=arguments.length,r=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(r=(a<3?s(r):a>3?s(t,n,r):s(t,n))||r);return a>3&&r&&Object.defineProperty(t,n,r),r};let ze=class extends i.WF{render(){return i.qy`
      <wui-flex flexDirection="column" gap="2" class="pay-options-container">
        ${this.renderOptionEntry()} ${this.renderOptionEntry()} ${this.renderOptionEntry()}
      </wui-flex>
    `}renderOptionEntry(){return i.qy`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        gap="2"
        class="pay-option-container"
      >
        <wui-flex alignItems="center" gap="2">
          <wui-flex class="token-images-container">
            <wui-shimmer
              width="32px"
              height="32px"
              rounded
              variant="light"
              class="token-image"
            ></wui-shimmer>
            <wui-shimmer
              width="16px"
              height="16px"
              rounded
              variant="light"
              class="chain-image"
            ></wui-shimmer>
          </wui-flex>

          <wui-flex flexDirection="column" gap="1">
            <wui-shimmer
              width="74px"
              height="16px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>
            <wui-shimmer
              width="46px"
              height="14px"
              borderRadius="4xs"
              variant="light"
            ></wui-shimmer>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}};ze.styles=[je],ze=_e([(0,m.EM)("w3m-pay-options-skeleton")],ze);const Le=m.AH`
  :host {
    display: block;
    width: 100%;
  }

  .pay-options-container {
    max-height: 196px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    mask-image: var(--options-mask-image);
    -webkit-mask-image: var(--options-mask-image);
  }

  .pay-options-container::-webkit-scrollbar {
    display: none;
  }

  .pay-option-container {
    cursor: pointer;
    border-radius: ${({borderRadius:e})=>e[4]};
    padding: ${({spacing:e})=>e[3]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-1"]};
    will-change: background-color;
  }

  .token-images-container {
    position: relative;
    justify-content: center;
    align-items: center;
  }

  .token-image {
    border-radius: ${({borderRadius:e})=>e.round};
    width: 32px;
    height: 32px;
  }

  .chain-image {
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: -3px;
    right: -5px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 2px solid ${({tokens:e})=>e.theme.backgroundPrimary};
  }

  @media (hover: hover) and (pointer: fine) {
    .pay-option-container:hover {
      background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    }
  }
`;var Me=function(e,t,n,i){var s,a=arguments.length,r=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(r=(a<3?s(r):a>3?s(t,n,r):s(t,n))||r);return a>3&&r&&Object.defineProperty(t,n,r),r};let Be=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.options=[],this.selectedPaymentAsset=null}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.resizeObserver?.disconnect();const e=this.shadowRoot?.querySelector(".pay-options-container");e?.removeEventListener("scroll",this.handleOptionsListScroll.bind(this))}firstUpdated(){const e=this.shadowRoot?.querySelector(".pay-options-container");e&&(requestAnimationFrame(this.handleOptionsListScroll.bind(this)),e?.addEventListener("scroll",this.handleOptionsListScroll.bind(this)),this.resizeObserver=new ResizeObserver(()=>{this.handleOptionsListScroll()}),this.resizeObserver?.observe(e),this.handleOptionsListScroll())}render(){return i.qy`
      <wui-flex flexDirection="column" gap="2" class="pay-options-container">
        ${this.options.map(e=>this.payOptionTemplate(e))}
      </wui-flex>
    `}payOptionTemplate(e){const{network:t,metadata:n,asset:s,amount:r="0"}=e,u=o.W.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===t),l=`${t}:${s}`===`${this.selectedPaymentAsset?.network}:${this.selectedPaymentAsset?.asset}`,d=f.S.bigNumber(r,{safe:!0}),p=d.gt(0);return i.qy`
      <wui-flex
        alignItems="center"
        justifyContent="space-between"
        gap="2"
        @click=${()=>this.onSelect?.(e)}
        class="pay-option-container"
      >
        <wui-flex alignItems="center" gap="2">
          <wui-flex class="token-images-container">
            <wui-image
              src=${(0,a.J)(n.logoURI)}
              class="token-image"
              size="3xl"
            ></wui-image>
            <wui-image
              src=${(0,a.J)(c.$.getNetworkImage(u))}
              class="chain-image"
              size="md"
            ></wui-image>
          </wui-flex>

          <wui-flex flexDirection="column" gap="1">
            <wui-text variant="lg-regular" color="primary">${n.symbol}</wui-text>
            ${p?i.qy`<wui-text variant="sm-regular" color="secondary">
                  ${d.round(6).toString()} ${n.symbol}
                </wui-text>`:null}
          </wui-flex>
        </wui-flex>

        ${l?i.qy`<wui-icon name="checkmark" size="md" color="success"></wui-icon>`:null}
      </wui-flex>
    `}handleOptionsListScroll(){const e=this.shadowRoot?.querySelector(".pay-options-container");if(!e)return;e.scrollHeight>300?(e.style.setProperty("--options-mask-image","linear-gradient(\n          to bottom,\n          rgba(0, 0, 0, calc(1 - var(--options-scroll--top-opacity))) 0px,\n          rgba(200, 200, 200, calc(1 - var(--options-scroll--top-opacity))) 1px,\n          black 50px,\n          black calc(100% - 50px),\n          rgba(155, 155, 155, calc(1 - var(--options-scroll--bottom-opacity))) calc(100% - 1px),\n          rgba(0, 0, 0, calc(1 - var(--options-scroll--bottom-opacity))) 100%\n        )"),e.style.setProperty("--options-scroll--top-opacity",m.z8.interpolate([0,50],[0,1],e.scrollTop).toString()),e.style.setProperty("--options-scroll--bottom-opacity",m.z8.interpolate([0,50],[0,1],e.scrollHeight-e.scrollTop-e.offsetHeight).toString())):(e.style.setProperty("--options-mask-image","none"),e.style.setProperty("--options-scroll--top-opacity","0"),e.style.setProperty("--options-scroll--bottom-opacity","0"))}};Be.styles=[Le],Me([(0,s.MZ)({type:Array})],Be.prototype,"options",void 0),Me([(0,s.MZ)()],Be.prototype,"selectedPaymentAsset",void 0),Me([(0,s.MZ)()],Be.prototype,"onSelect",void 0),Be=Me([(0,m.EM)("w3m-pay-options")],Be);const Qe=m.AH`
  .payment-methods-container {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-top-right-radius: ${({borderRadius:e})=>e[5]};
    border-top-left-radius: ${({borderRadius:e})=>e[5]};
  }

  .pay-options-container {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    border-radius: ${({borderRadius:e})=>e[5]};
    padding: ${({spacing:e})=>e[1]};
  }

  w3m-tooltip-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: fit-content;
  }

  wui-image {
    border-radius: ${({borderRadius:e})=>e.round};
  }

  w3m-pay-options.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;var He=function(e,t,n,i){var s,a=arguments.length,r=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(r=(a<3?s(r):a>3?s(t,n,r):s(t,n))||r);return a>3&&r&&Object.defineProperty(t,n,r),r};const Ke={eip155:{icon:"ethereum",label:"EVM"},solana:{icon:"solana",label:"Solana"},bip122:{icon:"bitcoin",label:"Bitcoin"},ton:{icon:"ton",label:"Ton"}};let Ge=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.profileName=null,this.paymentAsset=pe.state.paymentAsset,this.namespace=void 0,this.caipAddress=void 0,this.amount=pe.state.amount,this.recipient=pe.state.recipient,this.activeConnectorIds=r.a.state.activeConnectorIds,this.selectedPaymentAsset=pe.state.selectedPaymentAsset,this.selectedExchange=pe.state.selectedExchange,this.isFetchingQuote=pe.state.isFetchingQuote,this.quoteError=pe.state.quoteError,this.quote=pe.state.quote,this.isFetchingTokenBalances=pe.state.isFetchingTokenBalances,this.tokenBalances=pe.state.tokenBalances,this.isPaymentInProgress=pe.state.isPaymentInProgress,this.exchangeUrlForQuote=pe.state.exchangeUrlForQuote,this.completedTransactionsCount=0,this.unsubscribe.push(pe.subscribeKey("paymentAsset",e=>this.paymentAsset=e)),this.unsubscribe.push(pe.subscribeKey("tokenBalances",e=>this.onTokenBalancesChanged(e))),this.unsubscribe.push(pe.subscribeKey("isFetchingTokenBalances",e=>this.isFetchingTokenBalances=e)),this.unsubscribe.push(r.a.subscribeKey("activeConnectorIds",e=>this.activeConnectorIds=e)),this.unsubscribe.push(pe.subscribeKey("selectedPaymentAsset",e=>this.selectedPaymentAsset=e)),this.unsubscribe.push(pe.subscribeKey("isFetchingQuote",e=>this.isFetchingQuote=e)),this.unsubscribe.push(pe.subscribeKey("quoteError",e=>this.quoteError=e)),this.unsubscribe.push(pe.subscribeKey("quote",e=>this.quote=e)),this.unsubscribe.push(pe.subscribeKey("amount",e=>this.amount=e)),this.unsubscribe.push(pe.subscribeKey("recipient",e=>this.recipient=e)),this.unsubscribe.push(pe.subscribeKey("isPaymentInProgress",e=>this.isPaymentInProgress=e)),this.unsubscribe.push(pe.subscribeKey("selectedExchange",e=>this.selectedExchange=e)),this.unsubscribe.push(pe.subscribeKey("exchangeUrlForQuote",e=>this.exchangeUrlForQuote=e)),this.resetQuoteState(),this.initializeNamespace(),this.fetchTokens()}disconnectedCallback(){super.disconnectedCallback(),this.resetAssetsState(),this.unsubscribe.forEach(e=>e())}updated(e){super.updated(e);e.has("selectedPaymentAsset")&&this.fetchQuote()}render(){return i.qy`
      <wui-flex flexDirection="column">
        ${this.profileTemplate()}

        <wui-flex
          flexDirection="column"
          gap="4"
          class="payment-methods-container"
          .padding=${["4","4","5","4"]}
        >
          ${this.paymentOptionsViewTemplate()} ${this.amountWithFeeTemplate()}

          <wui-flex
            alignItems="center"
            justifyContent="space-between"
            .padding=${["1","0","1","0"]}
          >
            <wui-separator></wui-separator>
          </wui-flex>

          ${this.paymentActionsTemplate()}
        </wui-flex>
      </wui-flex>
    `}profileTemplate(){if(this.selectedExchange){const e=f.S.formatNumber(this.quote?.origin.amount,{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString();return i.qy`
        <wui-flex
          .padding=${["4","3","4","3"]}
          alignItems="center"
          justifyContent="space-between"
          gap="2"
        >
          <wui-text variant="lg-regular" color="secondary">Paying with</wui-text>

          ${this.quote?i.qy`<wui-text variant="lg-regular" color="primary">
                ${f.S.bigNumber(e,{safe:!0}).round(6).toString()}
                ${this.quote.origin.currency.metadata.symbol}
              </wui-text>`:i.qy`<wui-shimmer width="80px" height="18px" variant="light"></wui-shimmer>`}
        </wui-flex>
      `}const e=x.w.getPlainAddress(this.caipAddress)??"",{name:t,image:n}=this.getWalletProperties({namespace:this.namespace}),{icon:s,label:r}=Ke[this.namespace]??{};return i.qy`
      <wui-flex
        .padding=${["4","3","4","3"]}
        alignItems="center"
        justifyContent="space-between"
        gap="2"
      >
        <wui-wallet-switch
          profileName=${(0,a.J)(this.profileName)}
          address=${(0,a.J)(e)}
          imageSrc=${(0,a.J)(n)}
          alt=${(0,a.J)(t)}
          @click=${this.onConnectOtherWallet.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>

        <wui-wallet-switch
          profileName=${(0,a.J)(r)}
          address=${(0,a.J)(e)}
          icon=${(0,a.J)(s)}
          iconSize="xs"
          .enableGreenCircle=${!1}
          alt=${(0,a.J)(r)}
          @click=${this.onConnectOtherWallet.bind(this)}
          data-testid="wui-wallet-switch"
        ></wui-wallet-switch>
      </wui-flex>
    `}initializeNamespace(){const e=o.W.state.activeChain;this.namespace=e,this.caipAddress=o.W.getAccountData(e)?.caipAddress,this.profileName=o.W.getAccountData(e)?.profileName??null,this.unsubscribe.push(o.W.subscribeChainProp("accountState",e=>this.onAccountStateChanged(e),e))}async fetchTokens(){if(this.namespace){let e;if(this.caipAddress){const{chainId:t,chainNamespace:n}=w.C.parseCaipAddress(this.caipAddress),i=`${n}:${t}`;e=o.W.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===i)}await pe.fetchTokens({caipAddress:this.caipAddress,caipNetwork:e,namespace:this.namespace})}}fetchQuote(){if(this.amount&&this.recipient&&this.selectedPaymentAsset&&this.paymentAsset){const{address:e}=this.caipAddress?w.C.parseCaipAddress(this.caipAddress):{};pe.fetchQuote({amount:this.amount.toString(),address:e,sourceToken:this.selectedPaymentAsset,toToken:this.paymentAsset,recipient:this.recipient})}}getWalletProperties({namespace:e}){if(!e)return{name:void 0,image:void 0};const t=this.activeConnectorIds[e];if(!t)return{name:void 0,image:void 0};const n=r.a.getConnector({id:t,namespace:e});if(!n)return{name:void 0,image:void 0};const i=c.$.getConnectorImage(n);return{name:n.name,image:i}}paymentOptionsViewTemplate(){return i.qy`
      <wui-flex flexDirection="column" gap="2">
        <wui-text variant="sm-regular" color="secondary">CHOOSE PAYMENT OPTION</wui-text>
        <wui-flex class="pay-options-container">${this.paymentOptionsTemplate()}</wui-flex>
      </wui-flex>
    `}paymentOptionsTemplate(){const e=this.getPaymentAssetFromTokenBalances();if(this.isFetchingTokenBalances)return i.qy`<w3m-pay-options-skeleton></w3m-pay-options-skeleton>`;if(0===e.length)return i.qy`<w3m-pay-options-empty
        @connectOtherWallet=${this.onConnectOtherWallet.bind(this)}
      ></w3m-pay-options-empty>`;const t={disabled:this.isFetchingQuote};return i.qy`<w3m-pay-options
      class=${(0,ye.H)(t)}
      .options=${e}
      .selectedPaymentAsset=${(0,a.J)(this.selectedPaymentAsset)}
      .onSelect=${this.onSelectedPaymentAssetChanged.bind(this)}
    ></w3m-pay-options>`}amountWithFeeTemplate(){return this.isFetchingQuote||!this.selectedPaymentAsset||this.quoteError?i.qy`<w3m-pay-fees-skeleton></w3m-pay-fees-skeleton>`:i.qy`<w3m-pay-fees></w3m-pay-fees>`}paymentActionsTemplate(){const e=this.isFetchingQuote||this.isFetchingTokenBalances,t=this.isFetchingQuote||this.isFetchingTokenBalances||!this.selectedPaymentAsset||Boolean(this.quoteError),n=f.S.formatNumber(this.quote?.origin.amount??0,{decimals:this.quote?.origin.currency.metadata.decimals??0}).toString();return this.selectedExchange?e||t?i.qy`
          <wui-shimmer width="100%" height="48px" variant="light" ?rounded=${!0}></wui-shimmer>
        `:i.qy`<wui-button
        size="lg"
        fullWidth
        variant="accent-secondary"
        @click=${this.onPayWithExchange.bind(this)}
      >
        ${`Continue in ${this.selectedExchange.name}`}

        <wui-icon name="arrowRight" color="inherit" size="sm" slot="iconRight"></wui-icon>
      </wui-button>`:i.qy`
      <wui-flex alignItems="center" justifyContent="space-between">
        <wui-flex flexDirection="column" gap="1">
          <wui-text variant="md-regular" color="secondary">Order Total</wui-text>

          ${e||t?i.qy`<wui-shimmer width="58px" height="32px" variant="light"></wui-shimmer>`:i.qy`<wui-flex alignItems="center" gap="01">
                <wui-text variant="h4-regular" color="primary">${re(n)}</wui-text>

                <wui-text variant="lg-regular" color="secondary">
                  ${this.quote?.origin.currency.metadata.symbol||"Unknown"}
                </wui-text>
              </wui-flex>`}
        </wui-flex>

        ${this.actionButtonTemplate({isLoading:e,isDisabled:t})}
      </wui-flex>
    `}actionButtonTemplate(e){const t=G(this.quote),{isLoading:n,isDisabled:s}=e;let a="Pay";return t.length>1&&0===this.completedTransactionsCount&&(a="Approve"),i.qy`
      <wui-button
        size="lg"
        variant="accent-primary"
        ?loading=${n||this.isPaymentInProgress}
        ?disabled=${s||this.isPaymentInProgress}
        @click=${()=>{t.length>0?this.onSendTransactions():this.onTransfer()}}
      >
        ${a}
        ${n?null:i.qy`<wui-icon
              name="arrowRight"
              color="inherit"
              size="sm"
              slot="iconRight"
            ></wui-icon>`}
      </wui-button>
    `}getPaymentAssetFromTokenBalances(){if(!this.namespace)return[];return(this.tokenBalances[this.namespace]??[]).map(e=>{try{return function(e){const t=o.W.getAllRequestedCaipNetworks().find(t=>t.caipNetworkId===e.chainId);let n=e.address;if(!t)throw new Error(`Target network not found for balance chainId "${e.chainId}"`);if(v.y.isLowerCaseMatch(e.symbol,t.nativeCurrency.symbol))n="native";else if(x.w.isCaipAddress(n)){const{address:e}=w.C.parseCaipAddress(n);n=e}else if(!n)throw new Error(`Balance address not found for balance symbol "${e.symbol}"`);return{network:t.caipNetworkId,asset:n,metadata:{name:e.name,symbol:e.symbol,decimals:Number(e.quantity.decimals),logoURI:e.iconUrl},amount:e.quantity.numeric}}(e)}catch(t){return null}}).filter(e=>Boolean(e)).filter(e=>{const{chainId:t}=w.C.parseCaipNetworkId(e.network),{chainId:n}=w.C.parseCaipNetworkId(this.paymentAsset.network);return!!v.y.isLowerCaseMatch(e.asset,this.paymentAsset.asset)||(!this.selectedExchange||!v.y.isLowerCaseMatch(t.toString(),n.toString()))})}onTokenBalancesChanged(e){this.tokenBalances=e;const[t]=this.getPaymentAssetFromTokenBalances();t&&pe.setSelectedPaymentAsset(t)}async onConnectOtherWallet(){await r.a.connect(),await l.W.open({view:"PayQuote"})}onAccountStateChanged(e){const{address:t}=this.caipAddress?w.C.parseCaipAddress(this.caipAddress):{};if(this.caipAddress=e?.caipAddress,this.profileName=e?.profileName??null,t){const{address:e}=this.caipAddress?w.C.parseCaipAddress(this.caipAddress):{};e?v.y.isLowerCaseMatch(e,t)||(this.resetAssetsState(),this.resetQuoteState(),this.fetchTokens()):l.W.close()}}onSelectedPaymentAssetChanged(e){this.isFetchingQuote||pe.setSelectedPaymentAsset(e)}async onTransfer(){const e=K(this.quote);if(e){if(!v.y.isLowerCaseMatch(this.selectedPaymentAsset?.asset,e.deposit.currency))throw new Error("Quote asset is not the same as the selected payment asset");const t=this.selectedPaymentAsset?.amount??"0",n=f.S.formatNumber(e.deposit.amount,{decimals:this.selectedPaymentAsset?.metadata.decimals??0}).toString();if(!f.S.bigNumber(t).gte(n))return void p.P.showError("Insufficient funds");if(this.quote&&this.selectedPaymentAsset&&this.caipAddress&&this.namespace){const{address:t}=w.C.parseCaipAddress(this.caipAddress);await pe.onTransfer({chainNamespace:this.namespace,fromAddress:t,toAddress:e.deposit.receiver,amount:n,paymentAsset:this.selectedPaymentAsset}),pe.setRequestId(e.requestId),u.I.push("PayLoading")}}}async onSendTransactions(){const e=this.selectedPaymentAsset?.amount??"0",t=f.S.formatNumber(this.quote?.origin.amount??0,{decimals:this.selectedPaymentAsset?.metadata.decimals??0}).toString();if(!f.S.bigNumber(e).gte(t))return void p.P.showError("Insufficient funds");const n=G(this.quote),[i]=G(this.quote,this.completedTransactionsCount);if(i&&this.namespace){await pe.onSendTransaction({namespace:this.namespace,transactionStep:i}),this.completedTransactionsCount+=1;this.completedTransactionsCount===n.length&&(pe.setRequestId(i.requestId),u.I.push("PayLoading"))}}onPayWithExchange(){if(this.exchangeUrlForQuote){const e=x.w.returnOpenHref("","popupWindow","scrollbar=yes,width=480,height=720");if(!e)throw new Error("Could not create popup window");e.location.href=this.exchangeUrlForQuote;const t=K(this.quote);t&&pe.setRequestId(t.requestId),pe.initiatePayment(),u.I.push("PayLoading")}}resetAssetsState(){pe.setSelectedPaymentAsset(null)}resetQuoteState(){pe.resetQuoteState()}};Ge.styles=Qe,He([(0,s.wk)()],Ge.prototype,"profileName",void 0),He([(0,s.wk)()],Ge.prototype,"paymentAsset",void 0),He([(0,s.wk)()],Ge.prototype,"namespace",void 0),He([(0,s.wk)()],Ge.prototype,"caipAddress",void 0),He([(0,s.wk)()],Ge.prototype,"amount",void 0),He([(0,s.wk)()],Ge.prototype,"recipient",void 0),He([(0,s.wk)()],Ge.prototype,"activeConnectorIds",void 0),He([(0,s.wk)()],Ge.prototype,"selectedPaymentAsset",void 0),He([(0,s.wk)()],Ge.prototype,"selectedExchange",void 0),He([(0,s.wk)()],Ge.prototype,"isFetchingQuote",void 0),He([(0,s.wk)()],Ge.prototype,"quoteError",void 0),He([(0,s.wk)()],Ge.prototype,"quote",void 0),He([(0,s.wk)()],Ge.prototype,"isFetchingTokenBalances",void 0),He([(0,s.wk)()],Ge.prototype,"tokenBalances",void 0),He([(0,s.wk)()],Ge.prototype,"isPaymentInProgress",void 0),He([(0,s.wk)()],Ge.prototype,"exchangeUrlForQuote",void 0),He([(0,s.wk)()],Ge.prototype,"completedTransactionsCount",void 0),Ge=He([(0,m.EM)("w3m-pay-quote-view")],Ge);async function Ye(e){return pe.handleOpenPay(e)}async function Je(e,t=3e5){if(t<=0)throw new _(I,"Timeout must be greater than 0");try{await Ye(e)}catch(n){if(n instanceof _)throw n;throw new _(E,n.message)}return new Promise((e,n)=>{let i=!1;const s=setTimeout(()=>{i||(i=!0,u(),n(new _(N,"Payment timeout")))},t);function a(){if(i)return;const t=pe.state.currentPayment,n=pe.state.error,a=pe.state.isPaymentInProgress;return"SUCCESS"===t?.status?(i=!0,u(),clearTimeout(s),void e({success:!0,result:t.result})):"FAILED"===t?.status?(i=!0,u(),clearTimeout(s),void e({success:!1,error:n||"Payment failed"})):void(!n||a||t||(i=!0,u(),clearTimeout(s),e({success:!1,error:n})))}const r=tt("currentPayment",a),o=tt("error",a),c=tt("isPaymentInProgress",a),u=(l=[r,o,c],()=>{l.forEach(e=>{try{e()}catch{}})});var l;a()})}function Ve(){return pe.getExchanges()}function Ze(){return pe.state.currentPayment?.result}function Xe(){return pe.state.error}function et(){return pe.state.isPaymentInProgress}function tt(e,t){return pe.subscribeKey(e,t)}const nt={network:"eip155:8453",asset:"native",metadata:{name:"Ethereum",symbol:"ETH",decimals:18}},it={network:"eip155:8453",asset:"0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},st={network:"eip155:84532",asset:"native",metadata:{name:"Ethereum",symbol:"ETH",decimals:18}},at={network:"eip155:1",asset:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},rt={network:"eip155:10",asset:"0x0b2c639c533813f4aa9d7837caf62653d097ff85",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},ot={network:"eip155:42161",asset:"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},ct={network:"eip155:137",asset:"0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},ut={network:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",asset:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",metadata:{name:"USD Coin",symbol:"USDC",decimals:6}},lt={network:"eip155:1",asset:"0xdAC17F958D2ee523a2206206994597C13D831ec7",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},dt={network:"eip155:10",asset:"0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},pt={network:"eip155:42161",asset:"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},mt={network:"eip155:137",asset:"0xc2132d05d31c914a87c6611c10748aeb04b58e8f",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},ht={network:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",asset:"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",metadata:{name:"Tether USD",symbol:"USDT",decimals:6}},gt={network:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",asset:"native",metadata:{name:"Solana",symbol:"SOL",decimals:9}}},90616(e,t,n){var i=n(37022),s=n(56370),a=n(56440),r=(n(18820),n(39446)),o=n(37845);const c=n(89406).AH`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: ${({spacing:e})=>e[1]};
  }

  /* -- Colors --------------------------------------------------- */
  button[data-type='accent'] wui-icon {
    color: ${({tokens:e})=>e.core.iconAccentPrimary};
  }

  button[data-type='neutral'][data-variant='primary'] wui-icon {
    color: ${({tokens:e})=>e.theme.iconInverse};
  }

  button[data-type='neutral'][data-variant='secondary'] wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  button[data-type='success'] wui-icon {
    color: ${({tokens:e})=>e.core.iconSuccess};
  }

  button[data-type='error'] wui-icon {
    color: ${({tokens:e})=>e.core.iconError};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='xs'] {
    width: 16px;
    height: 16px;

    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='sm'] {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[1]};
  }

  button[data-size='md'] {
    width: 24px;
    height: 24px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='lg'] {
    width: 28px;
    height: 28px;
    border-radius: ${({borderRadius:e})=>e[2]};
  }

  button[data-size='xs'] wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] wui-icon {
    width: 20px;
    height: 20px;
  }

  /* -- Hover --------------------------------------------------- */
  @media (hover: hover) {
    button[data-type='accent']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.foregroundAccent010};
    }

    button[data-variant='primary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }

    button[data-variant='secondary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
    }

    button[data-type='success']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.backgroundSuccess};
    }

    button[data-type='error']:hover:enabled {
      background-color: ${({tokens:e})=>e.core.backgroundError};
    }
  }

  /* -- Focus --------------------------------------------------- */
  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:e})=>e.core.foregroundAccent020};
  }

  /* -- Properties --------------------------------------------------- */
  button[data-full-width='true'] {
    width: 100%;
  }

  :host([fullWidth]) {
    width: 100%;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var u=function(e,t,n,i){var s,a=arguments.length,r=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(e,t,n,i);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(r=(a<3?s(r):a>3?s(t,n,r):s(t,n))||r);return a>3&&r&&Object.defineProperty(t,n,r),r};let l=class extends i.WF{constructor(){super(...arguments),this.icon="card",this.variant="primary",this.type="accent",this.size="md",this.iconSize=void 0,this.fullWidth=!1,this.disabled=!1}render(){return i.qy`<button
      data-variant=${this.variant}
      data-type=${this.type}
      data-size=${this.size}
      data-full-width=${this.fullWidth}
      ?disabled=${this.disabled}
    >
      <wui-icon color="inherit" name=${this.icon} size=${(0,a.J)(this.iconSize)}></wui-icon>
    </button>`}};l.styles=[r.W5,r.fD,c],u([(0,s.MZ)()],l.prototype,"icon",void 0),u([(0,s.MZ)()],l.prototype,"variant",void 0),u([(0,s.MZ)()],l.prototype,"type",void 0),u([(0,s.MZ)()],l.prototype,"size",void 0),u([(0,s.MZ)()],l.prototype,"iconSize",void 0),u([(0,s.MZ)({type:Boolean})],l.prototype,"fullWidth",void 0),u([(0,s.MZ)({type:Boolean})],l.prototype,"disabled",void 0),l=u([(0,o.E)("wui-icon-button")],l)},21311(e,t,n){n(71056)}}]);
//# sourceMappingURL=6538.8b36d71a.chunk.js.map