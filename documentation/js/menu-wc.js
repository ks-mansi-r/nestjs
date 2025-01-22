'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-f60d4c8671a9e4d1e672fe2c330e7e8e9c51b62695f72d0cc03256b074174c3dff185dc734d67e4bbfdfe526a84e3f82e0e1ff6a59863c706bf6d33b60c24135"' : 'data-bs-target="#xs-controllers-links-module-AppModule-f60d4c8671a9e4d1e672fe2c330e7e8e9c51b62695f72d0cc03256b074174c3dff185dc734d67e4bbfdfe526a84e3f82e0e1ff6a59863c706bf6d33b60c24135"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-f60d4c8671a9e4d1e672fe2c330e7e8e9c51b62695f72d0cc03256b074174c3dff185dc734d67e4bbfdfe526a84e3f82e0e1ff6a59863c706bf6d33b60c24135"' :
                                            'id="xs-controllers-links-module-AppModule-f60d4c8671a9e4d1e672fe2c330e7e8e9c51b62695f72d0cc03256b074174c3dff185dc734d67e4bbfdfe526a84e3f82e0e1ff6a59863c706bf6d33b60c24135"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-f60d4c8671a9e4d1e672fe2c330e7e8e9c51b62695f72d0cc03256b074174c3dff185dc734d67e4bbfdfe526a84e3f82e0e1ff6a59863c706bf6d33b60c24135"' : 'data-bs-target="#xs-injectables-links-module-AppModule-f60d4c8671a9e4d1e672fe2c330e7e8e9c51b62695f72d0cc03256b074174c3dff185dc734d67e4bbfdfe526a84e3f82e0e1ff6a59863c706bf6d33b60c24135"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-f60d4c8671a9e4d1e672fe2c330e7e8e9c51b62695f72d0cc03256b074174c3dff185dc734d67e4bbfdfe526a84e3f82e0e1ff6a59863c706bf6d33b60c24135"' :
                                        'id="xs-injectables-links-module-AppModule-f60d4c8671a9e4d1e672fe2c330e7e8e9c51b62695f72d0cc03256b074174c3dff185dc734d67e4bbfdfe526a84e3f82e0e1ff6a59863c706bf6d33b60c24135"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-2663d6b4c9fdf4887f70556da82bc0d661476b25e2b23be786b811d1048a3a474dd2a5ddda52221e801bda5ad60b8643c75d4d9ed1f7e8bec6d3c9a08a47e656"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-2663d6b4c9fdf4887f70556da82bc0d661476b25e2b23be786b811d1048a3a474dd2a5ddda52221e801bda5ad60b8643c75d4d9ed1f7e8bec6d3c9a08a47e656"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-2663d6b4c9fdf4887f70556da82bc0d661476b25e2b23be786b811d1048a3a474dd2a5ddda52221e801bda5ad60b8643c75d4d9ed1f7e8bec6d3c9a08a47e656"' :
                                            'id="xs-controllers-links-module-AuthModule-2663d6b4c9fdf4887f70556da82bc0d661476b25e2b23be786b811d1048a3a474dd2a5ddda52221e801bda5ad60b8643c75d4d9ed1f7e8bec6d3c9a08a47e656"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-2663d6b4c9fdf4887f70556da82bc0d661476b25e2b23be786b811d1048a3a474dd2a5ddda52221e801bda5ad60b8643c75d4d9ed1f7e8bec6d3c9a08a47e656"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-2663d6b4c9fdf4887f70556da82bc0d661476b25e2b23be786b811d1048a3a474dd2a5ddda52221e801bda5ad60b8643c75d4d9ed1f7e8bec6d3c9a08a47e656"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-2663d6b4c9fdf4887f70556da82bc0d661476b25e2b23be786b811d1048a3a474dd2a5ddda52221e801bda5ad60b8643c75d4d9ed1f7e8bec6d3c9a08a47e656"' :
                                        'id="xs-injectables-links-module-AuthModule-2663d6b4c9fdf4887f70556da82bc0d661476b25e2b23be786b811d1048a3a474dd2a5ddda52221e801bda5ad60b8643c75d4d9ed1f7e8bec6d3c9a08a47e656"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-77e1de661163633280b94644ea15eafaff74a19ae5d8e6787bf30cb79f63665db97688eabd081a8b1214eba5302e819d4120ac6ea9f1a9ab305fb756bf50a747"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-77e1de661163633280b94644ea15eafaff74a19ae5d8e6787bf30cb79f63665db97688eabd081a8b1214eba5302e819d4120ac6ea9f1a9ab305fb756bf50a747"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-77e1de661163633280b94644ea15eafaff74a19ae5d8e6787bf30cb79f63665db97688eabd081a8b1214eba5302e819d4120ac6ea9f1a9ab305fb756bf50a747"' :
                                            'id="xs-controllers-links-module-PostsModule-77e1de661163633280b94644ea15eafaff74a19ae5d8e6787bf30cb79f63665db97688eabd081a8b1214eba5302e819d4120ac6ea9f1a9ab305fb756bf50a747"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-77e1de661163633280b94644ea15eafaff74a19ae5d8e6787bf30cb79f63665db97688eabd081a8b1214eba5302e819d4120ac6ea9f1a9ab305fb756bf50a747"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-77e1de661163633280b94644ea15eafaff74a19ae5d8e6787bf30cb79f63665db97688eabd081a8b1214eba5302e819d4120ac6ea9f1a9ab305fb756bf50a747"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-77e1de661163633280b94644ea15eafaff74a19ae5d8e6787bf30cb79f63665db97688eabd081a8b1214eba5302e819d4120ac6ea9f1a9ab305fb756bf50a747"' :
                                        'id="xs-injectables-links-module-PostsModule-77e1de661163633280b94644ea15eafaff74a19ae5d8e6787bf30cb79f63665db97688eabd081a8b1214eba5302e819d4120ac6ea9f1a9ab305fb756bf50a747"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-f4ce874659c5e57fe157c8f2a1fede5e07c74259b169ff0efe3966644c9dc2fe5a9edbef9e73bbba5a7d3148261a0aedcc489225735df676dc2672d92898f5bd"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-f4ce874659c5e57fe157c8f2a1fede5e07c74259b169ff0efe3966644c9dc2fe5a9edbef9e73bbba5a7d3148261a0aedcc489225735df676dc2672d92898f5bd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-f4ce874659c5e57fe157c8f2a1fede5e07c74259b169ff0efe3966644c9dc2fe5a9edbef9e73bbba5a7d3148261a0aedcc489225735df676dc2672d92898f5bd"' :
                                            'id="xs-controllers-links-module-UsersModule-f4ce874659c5e57fe157c8f2a1fede5e07c74259b169ff0efe3966644c9dc2fe5a9edbef9e73bbba5a7d3148261a0aedcc489225735df676dc2672d92898f5bd"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-f4ce874659c5e57fe157c8f2a1fede5e07c74259b169ff0efe3966644c9dc2fe5a9edbef9e73bbba5a7d3148261a0aedcc489225735df676dc2672d92898f5bd"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-f4ce874659c5e57fe157c8f2a1fede5e07c74259b169ff0efe3966644c9dc2fe5a9edbef9e73bbba5a7d3148261a0aedcc489225735df676dc2672d92898f5bd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-f4ce874659c5e57fe157c8f2a1fede5e07c74259b169ff0efe3966644c9dc2fe5a9edbef9e73bbba5a7d3148261a0aedcc489225735df676dc2672d92898f5bd"' :
                                        'id="xs-injectables-links-module-UsersModule-f4ce874659c5e57fe157c8f2a1fede5e07c74259b169ff0efe3966644c9dc2fe5a9edbef9e73bbba5a7d3148261a0aedcc489225735df676dc2672d92898f5bd"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOPtionsDto.html" data-type="entity-link" >CreatePostMetaOPtionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostsDto.html" data-type="entity-link" >PatchPostsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});