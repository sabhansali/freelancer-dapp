"use strict";(globalThis.webpackChunkfreelancer_dapp_frontend||=[]).push([[6661],{56661(e,t,r){r.r(t),r.d(t,{W3mBuyInProgressView:()=>M,W3mOnRampProvidersView:()=>R,W3mOnrampFiatSelectView:()=>h,W3mOnrampTokensView:()=>A,W3mOnrampWidget:()=>Z,W3mWhatIsABuyView:()=>D});var i=r(37022),o=r(56370),n=r(56440),s=r(5455),a=r(36596),c=r(68737),u=r(71786),l=r(73609),d=r(89268);r(84107),r(45770),r(84875),r(56326);const p=d.AH`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity ${({easings:e})=>e["ease-out-power-1"]}
      ${({durations:e})=>e.md};
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;var m=function(e,t,r,i){var o,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,r,s):o(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s};let h=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.selectedCurrency=s.aG.state.paymentCurrency,this.currencies=s.aG.state.paymentCurrencies,this.currencyImages=a.j.state.currencyImages,this.checked=c.o.state.isLegalCheckboxChecked,this.unsubscribe.push(s.aG.subscribe(e=>{this.selectedCurrency=e.paymentCurrency,this.currencies=e.paymentCurrencies}),a.j.subscribeKey("currencyImages",e=>this.currencyImages=e),c.o.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{termsConditionsUrl:e,privacyPolicyUrl:t}=u.H.state,r=u.H.state.features?.legalCheckbox,o=Boolean(e||t)&&Boolean(r)&&!this.checked;return i.qy`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0","3","3","3"]}
        gap="2"
        class=${(0,n.J)(o?"disabled":void 0)}
      >
        ${this.currenciesTemplate(o)}
      </wui-flex>
    `}currenciesTemplate(e=!1){return this.currencies.map(t=>i.qy`
        <wui-list-item
          imageSrc=${(0,n.J)(this.currencyImages?.[t.id])}
          @click=${()=>this.selectCurrency(t)}
          variant="image"
          tabIdx=${(0,n.J)(e?-1:void 0)}
        >
          <wui-text variant="md-medium" color="primary">${t.id}</wui-text>
        </wui-list-item>
      `)}selectCurrency(e){e&&(s.aG.setPaymentCurrency(e),l.W.close())}};h.styles=p,m([(0,o.wk)()],h.prototype,"selectedCurrency",void 0),m([(0,o.wk)()],h.prototype,"currencies",void 0),m([(0,o.wk)()],h.prototype,"currencyImages",void 0),m([(0,o.wk)()],h.prototype,"checked",void 0),h=m([(0,d.EM)("w3m-onramp-fiat-select-view")],h);var y=r(17321),w=r(61139),g=r(24657),f=r(79323),b=r(60205),v=r(59979),x=r(1348);r(10477),r(21311),r(94582),r(90847);const k=d.AH`
  button {
    padding: ${({spacing:e})=>e[3]};
    border-radius: ${({borderRadius:e})=>e[4]};
    border: none;
    outline: none;
    background-color: ${({tokens:e})=>e.core.glass010};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: ${({spacing:e})=>e[3]};
    transition: background-color ${({easings:e})=>e["ease-out-power-1"]}
      ${({durations:e})=>e.md};
    will-change: background-color;
    cursor: pointer;
  }

  button:hover {
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
  }

  .provider-image {
    width: ${({spacing:e})=>e[10]};
    min-width: ${({spacing:e})=>e[10]};
    height: ${({spacing:e})=>e[10]};
    border-radius: calc(
      ${({borderRadius:e})=>e[4]} - calc(${({spacing:e})=>e[3]} / 2)
    );
    position: relative;
    overflow: hidden;
  }

  .network-icon {
    width: ${({spacing:e})=>e[3]};
    height: ${({spacing:e})=>e[3]};
    border-radius: calc(${({spacing:e})=>e[3]} / 2);
    overflow: hidden;
    box-shadow:
      0 0 0 3px ${({tokens:e})=>e.theme.foregroundPrimary},
      0 0 0 3px ${({tokens:e})=>e.theme.backgroundPrimary};
    transition: box-shadow ${({easings:e})=>e["ease-out-power-1"]}
      ${({durations:e})=>e.md};
    will-change: box-shadow;
  }

  button:hover .network-icon {
    box-shadow:
      0 0 0 3px ${({tokens:e})=>e.core.glass010},
      0 0 0 3px ${({tokens:e})=>e.theme.backgroundPrimary};
  }
`;var $=function(e,t,r,i){var o,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,r,s):o(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s};let C=class extends i.WF{constructor(){super(...arguments),this.disabled=!1,this.color="inherit",this.label="",this.feeRange="",this.loading=!1,this.onClick=null}render(){return i.qy`
      <button ?disabled=${this.disabled} @click=${this.onClick} ontouchstart>
        <wui-visual name=${(0,n.J)(this.name)} class="provider-image"></wui-visual>
        <wui-flex flexDirection="column" gap="01">
          <wui-text variant="md-regular" color="primary">${this.label}</wui-text>
          <wui-flex alignItems="center" justifyContent="flex-start" gap="4">
            <wui-text variant="sm-medium" color="primary">
              <wui-text variant="sm-regular" color="secondary">Fees</wui-text>
              ${this.feeRange}
            </wui-text>
            <wui-flex gap="2">
              <wui-icon name="bank" size="sm" color="default"></wui-icon>
              <wui-icon name="card" size="sm" color="default"></wui-icon>
            </wui-flex>
            ${this.networksTemplate()}
          </wui-flex>
        </wui-flex>
        ${this.loading?i.qy`<wui-loading-spinner color="secondary" size="md"></wui-loading-spinner>`:i.qy`<wui-icon name="chevronRight" color="default" size="sm"></wui-icon>`}
      </button>
    `}networksTemplate(){const e=y.W.getAllRequestedCaipNetworks(),t=e?.filter(e=>e?.assets?.imageId)?.slice(0,5);return i.qy`
      <wui-flex class="networks">
        ${t?.map(e=>i.qy`
            <wui-flex class="network-icon">
              <wui-image src=${(0,n.J)(x.$.getNetworkImage(e))}></wui-image>
            </wui-flex>
          `)}
      </wui-flex>
    `}};C.styles=[k],$([(0,o.MZ)({type:Boolean})],C.prototype,"disabled",void 0),$([(0,o.MZ)()],C.prototype,"color",void 0),$([(0,o.MZ)()],C.prototype,"name",void 0),$([(0,o.MZ)()],C.prototype,"label",void 0),$([(0,o.MZ)()],C.prototype,"feeRange",void 0),$([(0,o.MZ)({type:Boolean})],C.prototype,"loading",void 0),$([(0,o.MZ)()],C.prototype,"onClick",void 0),C=$([(0,d.EM)("w3m-onramp-provider-item")],C);r(70980);var P=function(e,t,r,i){var o,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,r,s):o(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s};let R=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.providers=s.aG.state.providers,this.unsubscribe.push(s.aG.subscribeKey("providers",e=>{this.providers=e}))}render(){return i.qy`
      <wui-flex flexDirection="column" .padding=${["0","3","3","3"]} gap="2">
        ${this.onRampProvidersTemplate()}
      </wui-flex>
    `}onRampProvidersTemplate(){return this.providers.filter(e=>e.supportedChains.includes(y.W.state.activeChain??"eip155")).map(e=>i.qy`
          <w3m-onramp-provider-item
            label=${e.label}
            name=${e.name}
            feeRange=${e.feeRange}
            @click=${()=>{this.onClickProvider(e)}}
            ?disabled=${!e.url}
            data-testid=${`onramp-provider-${e.name}`}
          ></w3m-onramp-provider-item>
        `)}onClickProvider(e){s.aG.setSelectedProvider(e),w.I.push("BuyInProgress"),g.w.openHref(s.aG.state.selectedProvider?.url||e.url,"popupWindow","width=600,height=800,scrollbars=yes"),f.E.sendEvent({type:"track",event:"SELECT_BUY_PROVIDER",properties:{provider:e.name,isSmartAccount:(0,b.lj)(y.W.state.activeChain)===v.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}})}};P([(0,o.wk)()],R.prototype,"providers",void 0),R=P([(0,d.EM)("w3m-onramp-providers-view")],R);r(455);const I=d.AH`
  :host > wui-grid {
    max-height: 360px;
    overflow: auto;
  }

  wui-flex {
    transition: opacity ${({easings:e})=>e["ease-out-power-1"]}
      ${({durations:e})=>e.md};
    will-change: opacity;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-flex.disabled {
    opacity: 0.3;
    pointer-events: none;
    user-select: none;
  }
`;var O=function(e,t,r,i){var o,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,r,s):o(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s};let A=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.selectedCurrency=s.aG.state.purchaseCurrencies,this.tokens=s.aG.state.purchaseCurrencies,this.tokenImages=a.j.state.tokenImages,this.checked=c.o.state.isLegalCheckboxChecked,this.unsubscribe.push(s.aG.subscribe(e=>{this.selectedCurrency=e.purchaseCurrencies,this.tokens=e.purchaseCurrencies}),a.j.subscribeKey("tokenImages",e=>this.tokenImages=e),c.o.subscribeKey("isLegalCheckboxChecked",e=>{this.checked=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{termsConditionsUrl:e,privacyPolicyUrl:t}=u.H.state,r=u.H.state.features?.legalCheckbox,o=Boolean(e||t)&&Boolean(r)&&!this.checked;return i.qy`
      <w3m-legal-checkbox></w3m-legal-checkbox>
      <wui-flex
        flexDirection="column"
        .padding=${["0","3","3","3"]}
        gap="2"
        class=${(0,n.J)(o?"disabled":void 0)}
      >
        ${this.currenciesTemplate(o)}
      </wui-flex>
    `}currenciesTemplate(e=!1){return this.tokens.map(t=>i.qy`
        <wui-list-item
          imageSrc=${(0,n.J)(this.tokenImages?.[t.symbol])}
          @click=${()=>this.selectToken(t)}
          variant="image"
          tabIdx=${(0,n.J)(e?-1:void 0)}
        >
          <wui-flex gap="1" alignItems="center">
            <wui-text variant="md-medium" color="primary">${t.name}</wui-text>
            <wui-text variant="sm-regular" color="secondary">${t.symbol}</wui-text>
          </wui-flex>
        </wui-list-item>
      `)}selectToken(e){e&&(s.aG.setPurchaseCurrency(e),l.W.close())}};A.styles=I,O([(0,o.wk)()],A.prototype,"selectedCurrency",void 0),O([(0,o.wk)()],A.prototype,"tokens",void 0),O([(0,o.wk)()],A.prototype,"tokenImages",void 0),O([(0,o.wk)()],A.prototype,"checked",void 0),A=O([(0,d.EM)("w3m-onramp-token-select-view")],A);var j=r(93022),W=r(36141),q=r(7258);r(92016),r(60677),r(43901),r(27667);const G=d.AH`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-visual {
    border-radius: calc(
      ${({borderRadius:e})=>e[1]} * 9 - ${({borderRadius:e})=>e[3]}
    );
    position: relative;
    overflow: hidden;
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({spacing:e})=>e[1]} * -1);
    bottom: calc(${({spacing:e})=>e[1]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity ${({durations:e})=>e.lg} ${({easings:e})=>e["ease-out-power-2"]},
      transform ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({spacing:e})=>e[4]};
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({easings:e})=>e["ease-out-power-2"]} both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  wui-link {
    padding: ${({spacing:e})=>e["01"]} ${({spacing:e})=>e[2]};
  }
`;var T=function(e,t,r,i){var o,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,r,s):o(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s};let M=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.selectedOnRampProvider=s.aG.state.selectedProvider,this.uri=j.x.state.wcUri,this.ready=!1,this.showRetry=!1,this.buffering=!1,this.error=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(s.aG.subscribeKey("selectedProvider",e=>{this.selectedOnRampProvider=e}))}disconnectedCallback(){this.intervalId&&clearInterval(this.intervalId)}render(){let e="Continue in external window";this.error?e="Buy failed":this.selectedOnRampProvider&&(e=`Buy in ${this.selectedOnRampProvider?.label}`);const t=this.error?"Buy can be declined from your side or due to and error on the provider app":"We\u2019ll notify you once your Buy is processed";return i.qy`
      <wui-flex
        data-error=${(0,n.J)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="5"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-visual
            name=${(0,n.J)(this.selectedOnRampProvider?.name)}
            size="lg"
            class="provider-image"
          >
          </wui-visual>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            color="error"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["4","0","0","0"]}
        >
          <wui-text variant="md-medium" color=${this.error?"error":"primary"}>
            ${e}
          </wui-text>
          <wui-text align="center" variant="sm-medium" color="secondary">${t}</wui-text>
        </wui-flex>

        ${this.error?this.tryAgainTemplate():null}
      </wui-flex>

      <wui-flex .padding=${["0","5","5","5"]} justifyContent="center">
        <wui-link @click=${this.onCopyUri} color="secondary">
          <wui-icon size="sm" color="default" slot="iconLeft" name="copy"></wui-icon>
          Copy link
        </wui-link>
      </wui-flex>
    `}onTryAgain(){this.selectedOnRampProvider&&(this.error=!1,g.w.openHref(this.selectedOnRampProvider.url,"popupWindow","width=600,height=800,scrollbars=yes"))}tryAgainTemplate(){return this.selectedOnRampProvider?.url?i.qy`<wui-button size="md" variant="accent" @click=${this.onTryAgain.bind(this)}>
      <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
      Try again
    </wui-button>`:null}loaderTemplate(){const e=W.W.state.themeVariables["--w3m-border-radius-master"],t=e?parseInt(e.replace("px",""),10):4;return i.qy`<wui-loading-thumbnail radius=${9*t}></wui-loading-thumbnail>`}onCopyUri(){if(!this.selectedOnRampProvider?.url)return q.P.showError("No link found"),void w.I.goBack();try{g.w.copyToClopboard(this.selectedOnRampProvider.url),q.P.showSuccess("Link copied")}catch{q.P.showError("Failed to copy")}}};M.styles=G,T([(0,o.wk)()],M.prototype,"intervalId",void 0),T([(0,o.wk)()],M.prototype,"selectedOnRampProvider",void 0),T([(0,o.wk)()],M.prototype,"uri",void 0),T([(0,o.wk)()],M.prototype,"ready",void 0),T([(0,o.wk)()],M.prototype,"showRetry",void 0),T([(0,o.wk)()],M.prototype,"buffering",void 0),T([(0,o.wk)()],M.prototype,"error",void 0),T([(0,o.MZ)({type:Boolean})],M.prototype,"isMobile",void 0),T([(0,o.MZ)()],M.prototype,"onRetry",void 0),M=T([(0,d.EM)("w3m-buy-in-progress-view")],M);var B=function(e,t,r,i){var o,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,r,s):o(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s};let D=class extends i.WF{render(){return i.qy`
      <wui-flex
        flexDirection="column"
        .padding=${["6","10","5","10"]}
        alignItems="center"
        gap="5"
      >
        <wui-visual name="onrampCard"></wui-visual>
        <wui-flex flexDirection="column" gap="2" alignItems="center">
          <wui-text align="center" variant="md-medium" color="primary">
            Quickly and easily buy digital assets!
          </wui-text>
          <wui-text align="center" variant="sm-regular" color="secondary">
            Simply select your preferred onramp provider and add digital assets to your account
            using your credit card or bank transfer
          </wui-text>
        </wui-flex>
        <wui-button @click=${w.I.goBack}>
          <wui-icon size="sm" color="inherit" name="add" slot="iconLeft"></wui-icon>
          Buy
        </wui-button>
      </wui-flex>
    `}};D=B([(0,d.EM)("w3m-what-is-a-buy-view")],D);r(76184);const E=d.AH`
  :host {
    width: 100%;
  }

  wui-loading-spinner {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }

  .currency-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:e})=>e[2]};
    height: 40px;
    padding: ${({spacing:e})=>e[2]} ${({spacing:e})=>e[2]}
      ${({spacing:e})=>e[2]} ${({spacing:e})=>e[2]};
    min-width: 95px;
    border-radius: ${({borderRadius:e})=>e.round};
    border: 1px solid ${({tokens:e})=>e.theme.foregroundPrimary};
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    cursor: pointer;
  }

  .currency-container > wui-image {
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }
`;var L=function(e,t,r,i){var o,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,r,s):o(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s};let F=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.type="Token",this.value=0,this.currencies=[],this.selectedCurrency=this.currencies?.[0],this.currencyImages=a.j.state.currencyImages,this.tokenImages=a.j.state.tokenImages,this.unsubscribe.push(s.aG.subscribeKey("purchaseCurrency",e=>{e&&"Fiat"!==this.type&&(this.selectedCurrency=this.formatPurchaseCurrency(e))}),s.aG.subscribeKey("paymentCurrency",e=>{e&&"Token"!==this.type&&(this.selectedCurrency=this.formatPaymentCurrency(e))}),s.aG.subscribe(e=>{"Fiat"===this.type?this.currencies=e.purchaseCurrencies.map(this.formatPurchaseCurrency):this.currencies=e.paymentCurrencies.map(this.formatPaymentCurrency)}),a.j.subscribe(e=>{this.currencyImages={...e.currencyImages},this.tokenImages={...e.tokenImages}}))}firstUpdated(){s.aG.getAvailableCurrencies()}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=this.selectedCurrency?.symbol||"",t=this.currencyImages[e]||this.tokenImages[e];return i.qy`<wui-input-text type="number" size="lg" value=${this.value}>
      ${this.selectedCurrency?i.qy` <wui-flex
            class="currency-container"
            justifyContent="space-between"
            alignItems="center"
            gap="1"
            @click=${()=>l.W.open({view:`OnRamp${this.type}Select`})}
          >
            <wui-image src=${(0,n.J)(t)}></wui-image>
            <wui-text color="primary">${this.selectedCurrency.symbol}</wui-text>
          </wui-flex>`:i.qy`<wui-loading-spinner></wui-loading-spinner>`}
    </wui-input-text>`}formatPaymentCurrency(e){return{name:e.id,symbol:e.id}}formatPurchaseCurrency(e){return{name:e.name,symbol:e.symbol}}};F.styles=E,L([(0,o.MZ)({type:String})],F.prototype,"type",void 0),L([(0,o.MZ)({type:Number})],F.prototype,"value",void 0),L([(0,o.wk)()],F.prototype,"currencies",void 0),L([(0,o.wk)()],F.prototype,"selectedCurrency",void 0),L([(0,o.wk)()],F.prototype,"currencyImages",void 0),L([(0,o.wk)()],F.prototype,"tokenImages",void 0),F=L([(0,d.EM)("w3m-onramp-input")],F);const S=d.AH`
  :host > wui-flex {
    width: 100%;
    max-width: 360px;
  }

  :host > wui-flex > wui-flex {
    border-radius: ${({borderRadius:e})=>e[8]};
    width: 100%;
  }

  .amounts-container {
    width: 100%;
  }
`;var U=function(e,t,r,i){var o,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(n<3?o(s):n>3?o(t,r,s):o(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s};const z={USD:"$",EUR:"\u20ac",GBP:"\xa3"},H=[100,250,500,1e3];let Z=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.disabled=!1,this.caipAddress=y.W.state.activeCaipAddress,this.loading=l.W.state.loading,this.paymentCurrency=s.aG.state.paymentCurrency,this.paymentAmount=s.aG.state.paymentAmount,this.purchaseAmount=s.aG.state.purchaseAmount,this.quoteLoading=s.aG.state.quotesLoading,this.unsubscribe.push(y.W.subscribeKey("activeCaipAddress",e=>this.caipAddress=e),l.W.subscribeKey("loading",e=>{this.loading=e}),s.aG.subscribe(e=>{this.paymentCurrency=e.paymentCurrency,this.paymentAmount=e.paymentAmount,this.purchaseAmount=e.purchaseAmount,this.quoteLoading=e.quotesLoading}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){return i.qy`
      <wui-flex flexDirection="column" justifyContent="center" alignItems="center">
        <wui-flex flexDirection="column" alignItems="center" gap="2">
          <w3m-onramp-input
            type="Fiat"
            @inputChange=${this.onPaymentAmountChange.bind(this)}
            .value=${this.paymentAmount||0}
          ></w3m-onramp-input>
          <w3m-onramp-input
            type="Token"
            .value=${this.purchaseAmount||0}
            .loading=${this.quoteLoading}
          ></w3m-onramp-input>
          <wui-flex justifyContent="space-evenly" class="amounts-container" gap="2">
            ${H.map(e=>i.qy`<wui-button
                  variant=${this.paymentAmount===e?"accent-secondary":"neutral-secondary"}
                  size="md"
                  textVariant="md-medium"
                  fullWidth
                  @click=${()=>this.selectPresetAmount(e)}
                  >${`${z[this.paymentCurrency?.id||"USD"]} ${e}`}</wui-button
                >`)}
          </wui-flex>
          ${this.templateButton()}
        </wui-flex>
      </wui-flex>
    `}templateButton(){return this.caipAddress?i.qy`<wui-button
          @click=${this.getQuotes.bind(this)}
          variant="accent-primary"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Get quotes
        </wui-button>`:i.qy`<wui-button
          @click=${this.openModal.bind(this)}
          variant="accent"
          fullWidth
          size="lg"
          borderRadius="xs"
        >
          Connect wallet
        </wui-button>`}getQuotes(){this.loading||l.W.open({view:"OnRampProviders"})}openModal(){l.W.open({view:"Connect"})}async onPaymentAmountChange(e){s.aG.setPaymentAmount(Number(e.detail)),await s.aG.getQuote()}async selectPresetAmount(e){s.aG.setPaymentAmount(e),await s.aG.getQuote()}};Z.styles=S,U([(0,o.MZ)({type:Boolean})],Z.prototype,"disabled",void 0),U([(0,o.wk)()],Z.prototype,"caipAddress",void 0),U([(0,o.wk)()],Z.prototype,"loading",void 0),U([(0,o.wk)()],Z.prototype,"paymentCurrency",void 0),U([(0,o.wk)()],Z.prototype,"paymentAmount",void 0),U([(0,o.wk)()],Z.prototype,"purchaseAmount",void 0),U([(0,o.wk)()],Z.prototype,"quoteLoading",void 0),Z=U([(0,d.EM)("w3m-onramp-widget")],Z)},21311(e,t,r){r(71056)}}]);
//# sourceMappingURL=6661.fbcd981b.chunk.js.map