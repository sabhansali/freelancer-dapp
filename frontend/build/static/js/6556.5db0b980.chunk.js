"use strict";(globalThis.webpackChunkfreelancer_dapp_frontend=globalThis.webpackChunkfreelancer_dapp_frontend||[]).push([[6556],{26556(e,t,r){r.r(t),r.d(t,{W3mWalletReceiveView:()=>x});var i=r(37022),o=r(56370),n=r(56440),a=r(17321),s=r(7258),c=r(1348),l=r(36141),u=r(60205),d=r(61139),w=r(24657),p=r(89268),h=(r(18820),r(71056),r(7836),r(52574),r(39446)),m=r(37845);const f=r(89406).AH`
  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${e=>{let{spacing:t}=e;return t[4]}};
    background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundPrimary}};
    border-radius: ${e=>{let{borderRadius:t}=e;return t[3]}};
    border: none;
    padding: ${e=>{let{spacing:t}=e;return t[3]}};
    transition: background-color ${e=>{let{durations:t}=e;return t.lg}}
      ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button:hover:enabled,
  button:active:enabled {
    background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundSecondary}};
  }

  wui-text {
    flex: 1;
    color: ${e=>{let{tokens:t}=e;return t.theme.textSecondary}};
  }

  wui-flex {
    width: auto;
    display: flex;
    align-items: center;
    gap: ${e=>{let{spacing:t}=e;return t["01"]}};
  }

  wui-icon {
    color: ${e=>{let{tokens:t}=e;return t.theme.iconDefault}};
  }

  .network-icon {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: ${e=>{let{borderRadius:t}=e;return t[4]}};
    overflow: hidden;
    margin-left: -8px;
  }

  .network-icon:first-child {
    margin-left: 0px;
  }

  .network-icon:after {
    position: absolute;
    inset: 0;
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    border-radius: ${e=>{let{borderRadius:t}=e;return t[4]}};
    box-shadow: inset 0 0 0 1px ${e=>{let{tokens:t}=e;return t.core.glass010}};
  }
`;var g=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let k=class extends i.WF{constructor(){super(...arguments),this.networkImages=[""],this.text=""}render(){return i.qy`
      <button>
        <wui-text variant="md-regular" color="inherit">${this.text}</wui-text>
        <wui-flex>
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="inherit"></wui-icon>
        </wui-flex>
      </button>
    `}networksTemplate(){const e=this.networkImages.slice(0,5);return i.qy` <wui-flex class="networks">
      ${e?.map(e=>i.qy` <wui-flex class="network-icon"> <wui-image src=${e}></wui-image> </wui-flex>`)}
    </wui-flex>`}};k.styles=[h.W5,h.fD,f],g([(0,o.MZ)({type:Array})],k.prototype,"networkImages",void 0),g([(0,o.MZ)()],k.prototype,"text",void 0),k=g([(0,m.E)("wui-compatible-network")],k);r(84107),r(75938),r(84875);var b=r(59979);const y=p.AH`
  wui-compatible-network {
    margin-top: ${e=>{let{spacing:t}=e;return t[4]}};
    width: 100%;
  }

  wui-qr-code {
    width: unset !important;
    height: unset !important;
  }

  wui-icon {
    align-items: normal;
  }
`;var v=function(e,t,r,i){var o,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,r,i);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(n<3?o(a):n>3?o(t,r,a):o(t,r))||a);return n>3&&a&&Object.defineProperty(t,r,a),a};let x=class extends i.WF{constructor(){super(),this.unsubscribe=[],this.address=a.W.getAccountData()?.address,this.profileName=a.W.getAccountData()?.profileName,this.network=a.W.state.activeCaipNetwork,this.unsubscribe.push(a.W.subscribeChainProp("accountState",e=>{e?(this.address=e.address,this.profileName=e.profileName):s.P.showError("Account not found")}),a.W.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.address)throw new Error("w3m-wallet-receive-view: No account provided");const e=c.$.getNetworkImage(this.network);return i.qy` <wui-flex
      flexDirection="column"
      .padding=${["0","4","4","4"]}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${p.Zv.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
        icon="copy"
        size="sm"
        imageSrc=${e||""}
        variant="gray"
      ></wui-chip-button>
      <wui-flex
        flexDirection="column"
        .padding=${["4","0","0","0"]}
        alignItems="center"
        gap="4"
      >
        <wui-qr-code
          size=${232}
          theme=${l.W.state.themeMode}
          uri=${this.address}
          ?arenaClear=${!0}
          color=${(0,n.J)(l.W.state.themeVariables["--apkt-qr-color"]??l.W.state.themeVariables["--w3m-qr-color"])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="lg-regular" color="primary" align="center">
          Copy your address or scan this QR code
        </wui-text>
        <wui-button @click=${this.onCopyClick.bind(this)} size="sm" variant="neutral-secondary">
          <wui-icon slot="iconLeft" size="sm" color="inherit" name="copy"></wui-icon>
          <wui-text variant="md-regular" color="inherit">Copy address</wui-text>
        </wui-button>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){const e=a.W.getAllRequestedCaipNetworks(),t=a.W.checkIfSmartAccountEnabled(),r=a.W.state.activeCaipNetwork,o=e.filter(e=>e?.chainNamespace===r?.chainNamespace);if((0,u.lj)(r?.chainNamespace)===b.Vl.ACCOUNT_TYPES.SMART_ACCOUNT&&t)return r?i.qy`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[c.$.getNetworkImage(r)??""]}
      ></wui-compatible-network>`:null;const n=o?.filter(e=>e?.assets?.imageId)?.slice(0,5),s=n.map(c.$.getNetworkImage).filter(Boolean);return i.qy`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${s}
    ></wui-compatible-network>`}onReceiveClick(){d.I.push("WalletCompatibleNetworks")}onCopyClick(){try{this.address&&(w.w.copyToClopboard(this.address),s.P.showSuccess("Address copied"))}catch{s.P.showError("Failed to copy")}}};x.styles=y,v([(0,o.wk)()],x.prototype,"address",void 0),v([(0,o.wk)()],x.prototype,"profileName",void 0),v([(0,o.wk)()],x.prototype,"network",void 0),x=v([(0,p.EM)("w3m-wallet-receive-view")],x)}}]);
//# sourceMappingURL=6556.5db0b980.chunk.js.map