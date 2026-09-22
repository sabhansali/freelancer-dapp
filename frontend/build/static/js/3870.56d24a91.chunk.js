"use strict";(globalThis.webpackChunkfreelancer_dapp_frontend=globalThis.webpackChunkfreelancer_dapp_frontend||[]).push([[3870],{73870(e,t,r){r.r(t),r.d(t,{W3mApproveTransactionView:()=>h,W3mRegisterAccountNameSuccess:()=>ee,W3mRegisterAccountNameView:()=>L,W3mSmartAccountSettingsView:()=>P,W3mUpgradeWalletView:()=>S});var i=r(37022),o=r(56370),n=r(25347),a=r(73609),s=r(71786),c=r(25015),l=r(36141),d=r(89268);const u=i.AH`
  div {
    width: 100%;
  }

  [data-ready='false'] {
    transform: scale(1.05);
  }

  @media (max-width: 430px) {
    [data-ready='false'] {
      transform: translateY(-50px);
    }
  }
`;var p=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let h=class extends i.WF{constructor(){super(),this.bodyObserver=void 0,this.unsubscribe=[],this.iframe=document.getElementById("w3m-iframe"),this.ready=!1,this.unsubscribe.push(a.W.subscribeKey("open",e=>{e||this.onHideIframe()}),a.W.subscribeKey("shake",e=>{this.iframe.style.animation=e?"w3m-shake 500ms var(--apkt-easings-ease-out-power-2)":"none"}))}disconnectedCallback(){this.onHideIframe(),this.unsubscribe.forEach(e=>e()),this.bodyObserver?.unobserve(window.document.body)}async firstUpdated(){await this.syncTheme(),this.iframe.style.display="block";const e=this?.renderRoot?.querySelector("div");this.bodyObserver=new ResizeObserver(t=>{const r=t?.[0]?.contentBoxSize,i=r?.[0]?.inlineSize;this.iframe.style.height="600px",e.style.height="600px",s.H.state.enableEmbedded?this.updateFrameSizeForEmbeddedMode():i&&i<=430?(this.iframe.style.width="100%",this.iframe.style.left="0px",this.iframe.style.bottom="0px",this.iframe.style.top="unset",this.onShowIframe()):(this.iframe.style.width="360px",this.iframe.style.left="calc(50% - 180px)",this.iframe.style.top="calc(50% - 300px + 32px)",this.iframe.style.bottom="unset",this.onShowIframe())}),this.bodyObserver.observe(window.document.body)}render(){return i.qy`<div data-ready=${this.ready} id="w3m-frame-container"></div>`}onShowIframe(){const e=window.innerWidth<=430;this.ready=!0,this.iframe.style.animation=e?"w3m-iframe-zoom-in-mobile 200ms var(--apkt-easings-ease-out-power-2)":"w3m-iframe-zoom-in 200ms var(--apkt-easings-ease-out-power-2)"}onHideIframe(){this.iframe.style.display="none",this.iframe.style.animation="w3m-iframe-fade-out 200ms var(--apkt-easings-ease-out-power-2)"}async syncTheme(){const e=c.a.getAuthConnector();if(e){const t=l.W.getSnapshot().themeMode,r=l.W.getSnapshot().themeVariables;await e.provider.syncTheme({themeVariables:r,w3mThemeVariables:(0,n.o)(r,t)})}}async updateFrameSizeForEmbeddedMode(){const e=this?.renderRoot?.querySelector("div");await new Promise(e=>{setTimeout(e,300)});const t=this.getBoundingClientRect();e.style.width="100%",this.iframe.style.left=`${t.left}px`,this.iframe.style.top=`${t.top}px`,this.iframe.style.width=`${t.width}px`,this.iframe.style.height=`${t.height}px`,this.onShowIframe()}};h.styles=u,p([(0,o.wk)()],h.prototype,"ready",void 0),h=p([(0,d.EM)("w3m-approve-transaction-view")],h);var g=r(84657),m=(r(84107),r(18820),r(71056),r(7836),r(39446)),f=r(37845),w=r(89406);const y=w.AH`
  a {
    border: none;
    border-radius: ${e=>{let{borderRadius:t}=e;return t[20]}};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${e=>{let{spacing:t}=e;return t[1]}};
    transition:
      background-color ${e=>{let{durations:t}=e;return t.lg}}
        ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}},
      box-shadow ${e=>{let{durations:t}=e;return t.lg}}
        ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}},
      border ${e=>{let{durations:t}=e;return t.lg}} ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}};
    will-change: background-color, box-shadow, border;
  }

  /* -- Variants --------------------------------------------------------------- */
  a[data-type='success'] {
    background-color: ${e=>{let{tokens:t}=e;return t.core.backgroundSuccess}};
    color: ${e=>{let{tokens:t}=e;return t.core.textSuccess}};
  }

  a[data-type='error'] {
    background-color: ${e=>{let{tokens:t}=e;return t.core.backgroundError}};
    color: ${e=>{let{tokens:t}=e;return t.core.textError}};
  }

  a[data-type='warning'] {
    background-color: ${e=>{let{tokens:t}=e;return t.core.backgroundWarning}};
    color: ${e=>{let{tokens:t}=e;return t.core.textWarning}};
  }

  /* -- Sizes --------------------------------------------------------------- */
  a[data-size='sm'] {
    height: 24px;
  }

  a[data-size='md'] {
    height: 28px;
  }

  a[data-size='lg'] {
    height: 32px;
  }

  a[data-size='sm'] > wui-image,
  a[data-size='sm'] > wui-icon {
    width: 16px;
    height: 16px;
  }

  a[data-size='md'] > wui-image,
  a[data-size='md'] > wui-icon {
    width: 20px;
    height: 20px;
  }

  a[data-size='lg'] > wui-image,
  a[data-size='lg'] > wui-icon {
    width: 24px;
    height: 24px;
  }

  wui-text {
    padding-left: ${e=>{let{spacing:t}=e;return t[1]}};
    padding-right: ${e=>{let{spacing:t}=e;return t[1]}};
  }

  wui-image {
    border-radius: ${e=>{let{borderRadius:t}=e;return t[3]}};
    overflow: hidden;
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  /* -- States --------------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    a[data-type='success']:not(:disabled):hover {
      background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundPrimary}};
      box-shadow: 0px 0px 0px 1px ${e=>{let{tokens:t}=e;return t.core.borderSuccess}};
    }

    a[data-type='error']:not(:disabled):hover {
      background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundPrimary}};
      box-shadow: 0px 0px 0px 1px ${e=>{let{tokens:t}=e;return t.core.borderError}};
    }

    a[data-type='warning']:not(:disabled):hover {
      background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundPrimary}};
      box-shadow: 0px 0px 0px 1px ${e=>{let{tokens:t}=e;return t.core.borderWarning}};
    }
  }

  a[data-type='success']:not(:disabled):focus-visible {
    box-shadow:
      0px 0px 0px 1px ${e=>{let{tokens:t}=e;return t.core.backgroundAccentPrimary}},
      0px 0px 0px 4px ${e=>{let{tokens:t}=e;return t.core.foregroundAccent020}};
  }

  a[data-type='error']:not(:disabled):focus-visible {
    box-shadow:
      0px 0px 0px 1px ${e=>{let{tokens:t}=e;return t.core.backgroundAccentPrimary}},
      0px 0px 0px 4px ${e=>{let{tokens:t}=e;return t.core.foregroundAccent020}};
  }

  a[data-type='warning']:not(:disabled):focus-visible {
    box-shadow:
      0px 0px 0px 1px ${e=>{let{tokens:t}=e;return t.core.backgroundAccentPrimary}},
      0px 0px 0px 4px ${e=>{let{tokens:t}=e;return t.core.foregroundAccent020}};
  }

  a:disabled {
    opacity: 0.5;
  }
`;var b=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};const x={sm:"md-regular",md:"lg-regular",lg:"lg-regular"},v={success:"sealCheck",error:"warning",warning:"exclamationCircle"};let $=class extends i.WF{constructor(){super(...arguments),this.type="success",this.size="md",this.imageSrc=void 0,this.disabled=!1,this.href="",this.text=void 0}render(){return i.qy`
      <a
        rel="noreferrer"
        target="_blank"
        href=${this.href}
        class=${this.disabled?"disabled":""}
        data-type=${this.type}
        data-size=${this.size}
      >
        ${this.imageTemplate()}
        <wui-text variant=${x[this.size]} color="inherit">${this.text}</wui-text>
      </a>
    `}imageTemplate(){return this.imageSrc?i.qy`<wui-image src=${this.imageSrc} size="inherit"></wui-image>`:i.qy`<wui-icon
      name=${v[this.type]}
      weight="fill"
      color="inherit"
      size="inherit"
      class="image-icon"
    ></wui-icon>`}};$.styles=[m.W5,m.fD,y],b([(0,o.MZ)()],$.prototype,"type",void 0),b([(0,o.MZ)()],$.prototype,"size",void 0),b([(0,o.MZ)()],$.prototype,"imageSrc",void 0),b([(0,o.MZ)({type:Boolean})],$.prototype,"disabled",void 0),b([(0,o.MZ)()],$.prototype,"href",void 0),b([(0,o.MZ)()],$.prototype,"text",void 0),$=b([(0,f.E)("wui-semantic-chip")],$);r(84875);var k=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let S=class extends i.WF{render(){return i.qy`
      <wui-flex flexDirection="column" alignItems="center" gap="5" padding="5">
        <wui-text variant="md-regular" color="primary">Follow the instructions on</wui-text>
        <wui-semantic-chip
          icon="externalLink"
          variant="fill"
          text=${g.oU.SECURE_SITE_DASHBOARD}
          href=${g.oU.SECURE_SITE_DASHBOARD}
          imageSrc=${g.oU.SECURE_SITE_FAVICON}
          data-testid="w3m-secure-website-button"
        >
        </wui-semantic-chip>
        <wui-text variant="sm-regular" color="secondary">
          You will have to reconnect for security reasons
        </wui-text>
      </wui-flex>
    `}};S=k([(0,d.EM)("w3m-upgrade-wallet-view")],S);var A=r(80883),R=r(17321),T=r(60205),E=r(93022),C=r(36568),N=r(67887),O=r(59979),_=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let P=class extends i.WF{constructor(){super(...arguments),this.loading=!1,this.switched=!1,this.text="",this.network=R.W.state.activeCaipNetwork}render(){return i.qy`
      <wui-flex flexDirection="column" gap="2" .padding=${["6","4","3","4"]}>
        ${this.togglePreferredAccountTypeTemplate()} ${this.toggleSmartAccountVersionTemplate()}
      </wui-flex>
    `}toggleSmartAccountVersionTemplate(){return i.qy`
      <w3m-tooltip-trigger text="Changing the smart account version will reload the page">
        <wui-list-item
          icon=${this.isV6()?"arrowTop":"arrowBottom"}
          ?rounded=${!0}
          ?chevron=${!0}
          data-testid="account-toggle-smart-account-version"
          @click=${this.toggleSmartAccountVersion.bind(this)}
        >
          <wui-text variant="lg-regular" color="primary"
            >Force Smart Account Version ${this.isV6()?"7":"6"}</wui-text
          >
        </wui-list-item>
      </w3m-tooltip-trigger>
    `}isV6(){return"v6"===(N.o.get("dapp_smart_account_version")||"v6")}toggleSmartAccountVersion(){N.o.set("dapp_smart_account_version",this.isV6()?"v7":"v6"),"undefined"!==typeof window&&window?.location?.reload()}togglePreferredAccountTypeTemplate(){const e=this.network?.chainNamespace,t=R.W.checkIfSmartAccountEnabled(),r=c.a.getConnectorId(e);return c.a.getAuthConnector()&&r===A.o.CONNECTOR_ID.AUTH&&t?(this.switched||(this.text=(0,T.lj)(e)===O.Vl.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your Smart Account"),i.qy`
      <wui-list-item
        icon="swapHorizontal"
        ?rounded=${!0}
        ?chevron=${!0}
        ?loading=${this.loading}
        @click=${this.changePreferredAccountType.bind(this)}
        data-testid="account-toggle-preferred-account-type"
      >
        <wui-text variant="lg-regular" color="primary">${this.text}</wui-text>
      </wui-list-item>
    `):null}async changePreferredAccountType(){const e=this.network?.chainNamespace,t=R.W.checkIfSmartAccountEnabled(),r=(0,T.lj)(e)!==O.Vl.ACCOUNT_TYPES.SMART_ACCOUNT&&t?O.Vl.ACCOUNT_TYPES.SMART_ACCOUNT:O.Vl.ACCOUNT_TYPES.EOA;c.a.getAuthConnector()&&(this.loading=!0,await E.x.setPreferredAccountType(r,e),this.text=r===O.Vl.ACCOUNT_TYPES.SMART_ACCOUNT?"Switch to your EOA":"Switch to your Smart Account",this.switched=!0,C.R.resetSend(),this.loading=!1,this.requestUpdate())}};_([(0,o.wk)()],P.prototype,"loading",void 0),_([(0,o.wk)()],P.prototype,"switched",void 0),_([(0,o.wk)()],P.prototype,"text",void 0),_([(0,o.wk)()],P.prototype,"network",void 0),P=_([(0,d.EM)("w3m-smart-account-settings-view")],P);var M=r(94657),I=r(83793),W=r(24657),D=r(79323),j=r(7258);r(23723),r(29319);const z=w.AH`
  :host {
    width: 100%;
  }

  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundPrimary}};
    border-radius: ${e=>{let{borderRadius:t}=e;return t[4]}};
    padding: ${e=>{let{spacing:t}=e;return t[4]}};
  }

  .name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      cursor: pointer;
      background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundSecondary}};
      border-radius: ${e=>{let{borderRadius:t}=e;return t[6]}};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  button:focus-visible:enabled {
    box-shadow: 0 0 0 4px ${e=>{let{tokens:t}=e;return t.core.foregroundAccent040}};
    background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundSecondary}};
  }
`;var U=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let V=class extends i.WF{constructor(){super(...arguments),this.name="",this.registered=!1,this.loading=!1,this.disabled=!1}render(){return i.qy`
      <button ?disabled=${this.disabled}>
        <wui-text class="name" color="primary" variant="md-regular">${this.name}</wui-text>
        ${this.templateRightContent()}
      </button>
    `}templateRightContent(){return this.loading?i.qy`<wui-loading-spinner size="lg" color="primary"></wui-loading-spinner>`:this.registered?i.qy`<wui-tag variant="info" size="sm">Registered</wui-tag>`:i.qy`<wui-tag variant="success" size="sm">Available</wui-tag>`}};V.styles=[m.W5,m.fD,z],U([(0,o.MZ)()],V.prototype,"name",void 0),U([(0,o.MZ)({type:Boolean})],V.prototype,"registered",void 0),U([(0,o.MZ)({type:Boolean})],V.prototype,"loading",void 0),U([(0,o.MZ)({type:Boolean})],V.prototype,"disabled",void 0),V=U([(0,f.E)("wui-account-name-suggestion-item")],V);var q=r(56440);r(52501);const F=w.AH`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
  }

  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .base-name {
    position: absolute;
    right: ${e=>{let{spacing:t}=e;return t[4]}};
    top: 50%;
    transform: translateY(-50%);
    text-align: right;
    padding: ${e=>{let{spacing:t}=e;return t[1]}};
    background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundSecondary}};
    border-radius: ${e=>{let{borderRadius:t}=e;return t[1]}};
  }
`;var Z=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let B=class extends i.WF{constructor(){super(...arguments),this.disabled=!1,this.loading=!1}render(){return i.qy`
      <wui-input-text
        value=${(0,q.J)(this.value)}
        ?disabled=${this.disabled}
        .value=${this.value||""}
        data-testid="wui-ens-input"
        icon="search"
        inputRightPadding="5xl"
        .onKeyDown=${this.onKeyDown}
      ></wui-input-text>
    `}};B.styles=[m.W5,F],Z([(0,o.MZ)()],B.prototype,"errorMessage",void 0),Z([(0,o.MZ)({type:Boolean})],B.prototype,"disabled",void 0),Z([(0,o.MZ)()],B.prototype,"value",void 0),Z([(0,o.MZ)({type:Boolean})],B.prototype,"loading",void 0),Z([(0,o.MZ)({attribute:!1})],B.prototype,"onKeyDown",void 0),B=Z([(0,f.E)("wui-ens-input")],B);r(10477),r(42338),r(94582);var H=r(99199);const Y=d.AH`
  wui-flex {
    width: 100%;
  }

  .suggestion {
    background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundPrimary}};
    border-radius: ${e=>{let{borderRadius:t}=e;return t[4]}};
  }

  .suggestion:hover:not(:disabled) {
    cursor: pointer;
    border: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundSecondary}};
    border-radius: ${e=>{let{borderRadius:t}=e;return t[6]}};
    padding: ${e=>{let{spacing:t}=e;return t[4]}};
  }

  .suggestion:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .suggestion:focus-visible:not(:disabled) {
    box-shadow: 0 0 0 4px ${e=>{let{tokens:t}=e;return t.core.foregroundAccent040}};
    background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundSecondary}};
  }

  .suggested-name {
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  form {
    width: 100%;
    position: relative;
  }

  .input-submit-button,
  .input-loading-spinner {
    position: absolute;
    top: 22px;
    transform: translateY(-50%);
    right: 10px;
  }
`;var K=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let L=class extends i.WF{constructor(){super(),this.formRef=(0,M._)(),this.usubscribe=[],this.name="",this.error="",this.loading=I.f.state.loading,this.suggestions=I.f.state.suggestions,this.profileName=R.W.getAccountData()?.profileName,this.onDebouncedNameInputChange=W.w.debounce(e=>{e.length<4?this.error="Name must be at least 4 characters long":H.y.isValidReownName(e)?(this.error="",I.f.getSuggestions(e)):this.error="The value is not a valid username"}),this.usubscribe.push(I.f.subscribe(e=>{this.suggestions=e.suggestions,this.loading=e.loading}),R.W.subscribeChainProp("accountState",e=>{this.profileName=e?.profileName,e?.profileName&&(this.error="You already own a name")}))}firstUpdated(){this.formRef.value?.addEventListener("keydown",this.onEnterKey.bind(this))}disconnectedCallback(){super.disconnectedCallback(),this.usubscribe.forEach(e=>e()),this.formRef.value?.removeEventListener("keydown",this.onEnterKey.bind(this))}render(){return i.qy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding=${["1","3","4","3"]}
      >
        <form ${(0,M.K)(this.formRef)} @submit=${this.onSubmitName.bind(this)}>
          <wui-ens-input
            @inputChange=${this.onNameInputChange.bind(this)}
            .errorMessage=${this.error}
            .value=${this.name}
            .onKeyDown=${this.onKeyDown.bind(this)}
          >
          </wui-ens-input>
          ${this.submitButtonTemplate()}
          <input type="submit" hidden />
        </form>
        ${this.templateSuggestions()}
      </wui-flex>
    `}submitButtonTemplate(){const e=this.suggestions.find(e=>e.name?.split(".")?.[0]===this.name&&e.registered);if(this.loading)return i.qy`<wui-loading-spinner
        class="input-loading-spinner"
        color="secondary"
      ></wui-loading-spinner>`;const t=`${this.name}${A.o.WC_NAME_SUFFIX}`;return i.qy`
      <wui-icon-link
        ?disabled=${Boolean(e)}
        class="input-submit-button"
        size="sm"
        icon="chevronRight"
        iconColor=${e?"default":"accent-primary"}
        @click=${()=>this.onSubmitName(t)}
      >
      </wui-icon-link>
    `}onNameInputChange(e){const t=H.y.validateReownName(e.detail||"");this.name=t,this.onDebouncedNameInputChange(t)}onKeyDown(e){1!==e.key.length||H.y.isValidReownName(e.key)||e.preventDefault()}templateSuggestions(){return!this.name||this.name.length<4||this.error?null:i.qy`<wui-flex flexDirection="column" gap="1" alignItems="center">
      ${this.suggestions.map(e=>i.qy`<wui-account-name-suggestion-item
            name=${e.name}
            ?registered=${e.registered}
            ?loading=${this.loading}
            ?disabled=${e.registered||this.loading}
            data-testid="account-name-suggestion"
            @click=${()=>this.onSubmitName(e.name)}
          ></wui-account-name-suggestion-item>`)}
    </wui-flex>`}isAllowedToSubmit(e){const t=e.split(".")?.[0],r=this.suggestions.find(e=>e.name?.split(".")?.[0]===t&&e.registered);return!this.loading&&!this.error&&!this.profileName&&t&&I.f.validateName(t)&&!r}async onSubmitName(e){try{if(!this.isAllowedToSubmit(e))return;D.E.sendEvent({type:"track",event:"REGISTER_NAME_INITIATED",properties:{isSmartAccount:(0,T.lj)(R.W.state.activeChain)===O.Vl.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:e}}),await I.f.registerName(e),D.E.sendEvent({type:"track",event:"REGISTER_NAME_SUCCESS",properties:{isSmartAccount:(0,T.lj)(R.W.state.activeChain)===O.Vl.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:e}})}catch(t){j.P.showError(t.message),D.E.sendEvent({type:"track",event:"REGISTER_NAME_ERROR",properties:{isSmartAccount:(0,T.lj)(R.W.state.activeChain)===O.Vl.ACCOUNT_TYPES.SMART_ACCOUNT,ensName:e,error:W.w.parseError(t)}})}}onEnterKey(e){if("Enter"===e.key&&this.name&&this.isAllowedToSubmit(this.name)){const e=`${this.name}${A.o.WC_NAME_SUFFIX}`;this.onSubmitName(e)}}};L.styles=Y,K([(0,o.MZ)()],L.prototype,"errorMessage",void 0),K([(0,o.wk)()],L.prototype,"name",void 0),K([(0,o.wk)()],L.prototype,"error",void 0),K([(0,o.wk)()],L.prototype,"loading",void 0),K([(0,o.wk)()],L.prototype,"suggestions",void 0),K([(0,o.wk)()],L.prototype,"profileName",void 0),L=K([(0,d.EM)("w3m-register-account-name-view")],L);var G=r(71222),X=r(61139);r(92016),r(60677),r(43901);const J=i.AH`
  .continue-button-container {
    width: 100%;
  }
`;var Q=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let ee=class extends i.WF{render(){return i.qy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="6"
        .padding=${["0","0","4","0"]}
      >
        ${this.onboardingTemplate()} ${this.buttonsTemplate()}
        <wui-link
          @click=${()=>{W.w.openHref(G.T.URLS.FAQ,"_blank")}}
        >
          Learn more
          <wui-icon color="inherit" slot="iconRight" name="externalLink"></wui-icon>
        </wui-link>
      </wui-flex>
    `}onboardingTemplate(){return i.qy` <wui-flex
      flexDirection="column"
      gap="6"
      alignItems="center"
      .padding=${["0","6","0","6"]}
    >
      <wui-flex gap="3" alignItems="center" justifyContent="center">
        <wui-icon-box size="xl" color="success" icon="checkmark"></wui-icon-box>
      </wui-flex>
      <wui-flex flexDirection="column" alignItems="center" gap="3">
        <wui-text align="center" variant="md-medium" color="primary">
          Account name chosen successfully
        </wui-text>
        <wui-text align="center" variant="md-regular" color="primary">
          You can now fund your account and trade crypto
        </wui-text>
      </wui-flex>
    </wui-flex>`}buttonsTemplate(){return i.qy`<wui-flex
      .padding=${["0","4","0","4"]}
      gap="3"
      class="continue-button-container"
    >
      <wui-button fullWidth size="lg" borderRadius="xs" @click=${this.redirectToAccount.bind(this)}
        >Let's Go!
      </wui-button>
    </wui-flex>`}redirectToAccount(){X.I.replace("Account")}};ee.styles=J,ee=Q([(0,d.EM)("w3m-register-account-name-success-view")],ee)}}]);
//# sourceMappingURL=3870.56d24a91.chunk.js.map