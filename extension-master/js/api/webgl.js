(function () {
    'use strict';


    const IS_WEBGL2 = true;
    const HashLength = 30;

    const seed = `65,165,5,118,79,157,246,170,155,240,113,29,210,62,244,118,217,171,112,188,230,247,94,145,254,119,64,4,203,81,160,55`
    //Обьявление значений констант для спуфинга параметров WebGL1 и extensions
    const unmaskedvendorwebgl = 'Intel open source technology center INJECTED!';
    const unmaskedrendererwebgl = 'ATI Radeon Ti1020 INJECTED!';
    const webglrenderer = 'Yandex Browser INJECTED!';
    const webglvendor = 'WebKitty INJECTED!';
    const shadinglanguageversion = 'WebGL GLSL ES 14.88 INJECTED!';
    const glversion = 'WebGL 14.88 INJECTED!';
    const aliasedlinewidthrange = new Float32Array([14, 888]);
    const aliasedpointsizerange = new Float32Array([1, 1488]);
    const alphabits = 1488;
    const bluebits = 1488;
    const greenbits = 1488;
    const redbits = 1488;
    const maxdrawbufferswebgl = 1488;
    const stencilbits = 1488;
    const depthbits = 1488;
    const maxtexturemaxanisotropyext = 1488;
    const maxvertexattribs = 1488;
    const maxcombinedtextureimageunits = 1488;
    const maxcubemaptexturesize = 1488;
    const maxrenderbuffersize = 1488;
    const maxtexturesize = 1488;
    const maxfragmentuniformvectors = 1488;
    const maxvertexuniformvectors = 1488;
    const maxtextureimageunits = 1488;
    const maxvaryingvectors = 1488;
    const maxvertextextureimageunits = 1488;
    const maxviewportdims = 1488;

    //Обьявление значений констант для спуфинга параметров WebGL2
    const maxvertexuniformcomponents = 1337;
    const maxvertexuniformblocks = 1337;
    const maxvertexoutputcomponents = 1337;
    const maxvaryingcomponents = 1337;
    const maxtransformfeedbackinterleavedcomponents = 1337;
    const maxtransformfeedbackseparateattribs = 1337;
    const maxtransformfeedbackseparatecomponents = 1337;
    const maxfragmentuniformcomponents = 1337;
    const maxfragmentuniformblocks = 1337;
    const maxfragmentinputcomponents = 1337;
    const minprogramtexeloffset = 1337;
    const maxprogramtexeloffset = 1337;
    const maxdrawbuffers = 1337;
    const maxcolorattachments = 1337;
    const maxsamples = 1337;
    const max3dtexturesize = 1337;
    const maxarraytexturelayers = 1337;
    const maxtexturelodbias = 1337;
    const maxuniformbufferbindings = 1337;
    const maxuniformblocksize = 1337;
    const uniformbufferoffsetalignment = 1337;
    const maxcombineduniformblocks = 1337;
    const maxcombinedvertexuniformcomponents = 1337;
    const maxcombinedfragmentuniformcomponents = 1337;

    // Real methods from HTMLCanvasElement
    var originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    var originalToBlob = HTMLCanvasElement.prototype.toBlob;
    var originalMozGetAsFile = HTMLCanvasElement.prototype.mozGetAsFile;
    var originalGetContext = HTMLCanvasElement.prototype.getContext;

    // Real methods from CanvasRenderingContext2D
    var originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;

    // Real methods from WebGLRenderingContext
    var originalReadPixels = WebGLRenderingContext.prototype.readPixels;

    // Real methods from WebGL2RenderingContext
    var originalReadPixelsTwo = WebGL2RenderingContext.prototype.readPixels;

    var originalGetParam =  WebGL2RenderingContext.prototype.getParam;

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    const TimeoutDelay = 2 * 1000;

    let allowInjection = true;
    let storedObjectPrefix = "no_so_random";
    let storageElems;
    let notificationTimeoutID;

    console.log("canvas in progress");
    if (window.frameElement != null && window.frameElement.sandbox != null) {
        allowInjection = false;
        for (let i = 0; i < window.frameElement.sandbox.length; i++) {
            const val = window.frameElement.sandbox[i];
            if (val == 'allow-scripts') {
                allowInjection = true;
            }
        }
    }

    if (allowInjection) {
        const docId = true;
        let data = {};
        data.r = HashLength - randomIntFromInterval(0, HashLength + 10);
        data.g = HashLength - randomIntFromInterval(0, HashLength + 10);
        data.b = HashLength - randomIntFromInterval(0, HashLength + 10);
        data.a = HashLength - randomIntFromInterval(0, HashLength + 10);
        overrideMethods(docId, data);
    }

    function overrideMethods(docId, data) {
        const script = document.createElement('script');
        script.id = getRandomString();
        script.type = "text/javascript";
        if (allowInjection) {
            var newChild = document.createTextNode('try{(' + overrideDefaultMethods + ')(' + data.r + ',' + data.g + ',' + data.b + ',' + data.a + ',"' + script.id + '", "' + storedObjectPrefix + '");} catch (e) {console.error(e);}');
            script.appendChild(newChild);
            var node = (document.documentElement || document.head || document.body);
            if (typeof node[docId] === 'undefined') {
                node.insertBefore(script, node.firstChild);
                node[docId] = getRandomString();
            }
        }
    }

    function getRandomString() {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 5; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    }

    function showNotification() {
        console.log("showNotification");
        chrome.runtime.sendMessage({action: "show-notification", url: window.location.href});
    }

    (function addBodyListener() {
        window.addEventListener(storedObjectPrefix + "_show_notification", (evt) => {
            if (notificationTimeoutID) {
                clearTimeout(notificationTimeoutID);
            }
            notificationTimeoutID = setTimeout(showNotification, TimeoutDelay)
        });
    })();

    function overrideDefaultMethods(r, g, b, a, scriptId, storedObjectPrefix) {
        var scriptNode = document.getElementById(scriptId);

        function showNotification() {
            const evt = new CustomEvent(storedObjectPrefix + "_show_notification", {'detail': {}});
            window.dispatchEvent(evt);
        }

        function overrideCanvasProto(root) {
            function overrideCanvasInternal(name, old) {
                root.prototype[storedObjectPrefix + name] = old;
                Object.defineProperty(root.prototype, name,
                    {
                        value: function () {
                            var width = this.width;
                            var height = this.height;
                            var context = this.getContext("2d");
                            var imageData = context.getImageData(0, 0, width, height);
                            for (var i = 0; i < height; i++) {
                                for (var j = 0; j < width; j++) {
                                    var index = ((i * (width * 4)) + (j * 4));
                                    imageData.data[index + 0] = imageData.data[index + 0] + r;
                                    imageData.data[index + 1] = imageData.data[index + 1] + g;
                                    imageData.data[index + 2] = imageData.data[index + 2] + b;
                                    imageData.data[index + 3] = imageData.data[index + 3] + a;
                                }
                            }
                            context.putImageData(imageData, 0, 0);
                            showNotification();
                            return old.apply(this, arguments);
                        }
                    }
                );
            }

            overrideCanvasInternal("toDataURL", root.prototype.toDataURL);
            overrideCanvasInternal("toBlob", root.prototype.toBlob);
            //overrideCanvasInternal("mozGetAsFile", root.prototype.mozGetAsFile);
        }

        function overrideCanvaRendProto(root) {
            const name = "getImageData";
            const getImageData = root.prototype.getImageData;

            root.prototype[storedObjectPrefix + name] = getImageData;

            Object.defineProperty(root.prototype, "getImageData",
                {
                    value: function () {
                        var imageData = getImageData.apply(this, arguments);
                        var height = imageData.height;
                        var width = imageData.width;
                        // console.log("getImageData " + width + " " + height);
                        for (var i = 0; i < height; i++) {
                            for (var j = 0; j < width; j++) {
                                var index = ((i * (width * 4)) + (j * 4));
                                imageData.data[index + 0] = imageData.data[index + 0] + r;
                                imageData.data[index + 1] = imageData.data[index + 1] + g;
                                imageData.data[index + 2] = imageData.data[index + 2] + b;
                                imageData.data[index + 3] = imageData.data[index + 3] + a;
                            }
                        }
                        showNotification();
                        return imageData;
                    }
                }
            );
        }

        function inject(element) {
            if (element.tagName.toUpperCase() === "IFRAME" && element.contentWindow) {
                try {
                    var hasAccess = element.contentWindow.HTMLCanvasElement;
                } catch (e) {
                    console.log("can't access " + e);
                    return;
                }
                overrideCanvasProto(element.contentWindow.HTMLCanvasElement);
                overrideCanvaRendProto(element.contentWindow.CanvasRenderingContext2D);
                overrideDocumentProto(element.contentWindow.Document);
            }
        }

        function overrideDocumentProto(root) {
            function doOverrideDocumentProto(old, name) {
                root.prototype[storedObjectPrefix + name] = old;
                Object.defineProperty(root.prototype, name,
                    {
                        value: function () {
                            var element = old.apply(this, arguments);
                            // console.log(name+ " everridden call"+element);
                            if (element == null) {
                                return null;
                            }
                            if (Object.prototype.toString.call(element) === '[object HTMLCollection]' ||
                                Object.prototype.toString.call(element) === '[object NodeList]') {
                                for (var i = 0; i < element.length; ++i) {
                                    var el = element[i];
                                    // console.log("elements list inject " + name);
                                    inject(el);
                                }
                            } else {
                                // console.log("element inject " + name);
                                inject(element);
                            }
                            return element;
                        }
                    }
                );
            }

            doOverrideDocumentProto(root.prototype.createElement, "createElement");
            doOverrideDocumentProto(root.prototype.createElementNS, "createElementNS");
            doOverrideDocumentProto(root.prototype.getElementById, "getElementById");
            doOverrideDocumentProto(root.prototype.getElementsByName, "getElementsByName");
            doOverrideDocumentProto(root.prototype.getElementsByClassName, "getElementsByClassName");
            doOverrideDocumentProto(root.prototype.getElementsByTagName, "getElementsByTagName");
            doOverrideDocumentProto(root.prototype.getElementsByTagNameNS, "getElementsByTagNameNS");
        }

        overrideCanvasProto(HTMLCanvasElement);
        overrideCanvaRendProto(CanvasRenderingContext2D);
        overrideDocumentProto(Document);
        scriptNode.parentNode.removeChild(scriptNode);
    }


    // Fake data from an ImageData object
    function fakeImageData(image) {
        Math.seedrandom(seed);

        // TODO: Need a faster and more effective spoofing algorithm
        // TODO: Could the value be cached?
        for (var i = 0; i < image.data.length; i++) {
            image.data[i] += (randomBoolean() ? 1 : -1);
        }

        return image;
    }

    var extensions = {
        'OES_texture_float': {},
        'OES_texture_half_float': {
            'HALF_FLOAT_OES': 36193
        },
        'WEBGL_lose_context': {
            loseContext,
            restoreContext
        },
        'OES_standard_derivatives': {
            'FRAGMENT_SHADER_DERIVATIVE_HINT_OES': 35723
        },
        'OES_vertex_array_object': {
            'VERTEX_ARRAY_BINDING_OES': 34229
        },
        'WEBGL_debug_renderer_info': {
            'UNMASKED_VENDOR_WEBGL': 37445,
            'UNMASKED_RENDERER_WEBGL': 37446
        },
        'WEBGL_debug_shaders': {},
        'WEBGL_depth_texture': {
            'UNSIGNED_INT_24_8_WEBGL': 34042
        },
        'OES_element_index_uint': {},
        'EXT_texture_filter_anisotropic': {
            'MAX_TEXTURE_MAX_ANISOTROPY_EXT': 34047,
            'TEXTURE_MAX_ANISOTROPY_EXT': 34046
        },
        'EXT_frag_depth': {},
        'WEBGL_draw_buffers': {
            'MAX_DRAW_BUFFERS_WEBGL': 34852,
            'MAX_COLOR_ATTACHMENTS_WEBGL': 36063,
            'DRAW_BUFFER9_WEBGL': 34862,
            'DRAW_BUFFER8_WEBGL': 34861,
            'DRAW_BUFFER7_WEBGL': 34860,
            'DRAW_BUFFER6_WEBGL': 34859,
            'DRAW_BUFFER5_WEBGL': 34858,
            'DRAW_BUFFER4_WEBGL': 34857,
            'DRAW_BUFFER3_WEBGL': 34856,
            'DRAW_BUFFER2_WEBGL': 34855,
            'DRAW_BUFFER15_WEBGL': 34868,
            'DRAW_BUFFER14_WEBGL': 34867,
            'DRAW_BUFFER13_WEBGL': 34866,
            'DRAW_BUFFER12_WEBGL': 34865,
            'DRAW_BUFFER11_WEBGL': 34864,
            'DRAW_BUFFER10_WEBGL': 34863,
            'DRAW_BUFFER1_WEBGL': 34854,
            'DRAW_BUFFER0_WEBGL': 34853,
            'COLOR_ATTACHMENT9_WEBGL': 36073,
            'COLOR_ATTACHMENT8_WEBGL': 36072,
            'COLOR_ATTACHMENT7_WEBGL': 36071,
            'COLOR_ATTACHMENT6_WEBGL': 36070,
            'COLOR_ATTACHMENT5_WEBGL': 36069,
            'COLOR_ATTACHMENT4_WEBGL': 36068,
            'COLOR_ATTACHMENT3_WEBGL': 36067,
            'COLOR_ATTACHMENT2_WEBGL': 36066,
            'COLOR_ATTACHMENT15_WEBGL': 36079,
            'COLOR_ATTACHMENT14_WEBGL': 36078,
            'COLOR_ATTACHMENT13_WEBGL': 36077,
            'COLOR_ATTACHMENT12_WEBGL': 36076,
            'COLOR_ATTACHMENT11_WEBGL': 36075,
            'COLOR_ATTACHMENT10_WEBGL': 36074,
            'COLOR_ATTACHMENT1_WEBGL': 36065,
            'COLOR_ATTACHMENT0_WEBGL': 36064,
            drawBuffersWEBGL
        },
        'ANGLE_instanced_arrays': {
            'VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE': 35070
        },
        'OES_texture_float_linear': {},
        'OES_texture_half_float_linear': {},
        'EXT_blend_minmax': {},
        'EXT_shader_texture_lod': {},
        'WEBGL_compressed_texture_atc': null,
        'WEBGL_compressed_texture_pvrtc': {
            'COMPRESSED_RGB_PVRTC_4BPPV1_IMG': 35840,
            'COMPRESSED_RGBA_PVRTC_4BPPV1_IMG': 35842,
            'COMPRESSED_RGB_PVRTC_2BPPV1_IMG': 35841,
            'COMPRESSED_RGBA_PVRTC_2BPPV1_IMG': 35843
        },
        'EXT_color_buffer_half_float': {},
        'WEBGL_color_buffer_float': {
            'RGBA32F_EXT': 34836,
            'RGB32F_EXT': 34837,
            'FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT': 33297,
            'UNSIGNED_NORMALIZED_EXT': 35863
        },
        'EXT_sRGB': {
            'SRGB_EXT': 35904,
            'SRGB_ALPHA_EXT': 35906,
            'SRGB8_ALPHA8_EXT': 35907,
            'FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT': 33296
        },
        'WEBGL_compressed_texture_etc1': {
            'COMPRESSED_RGB_ETC1_WEBGL': 36196
        },
        'WEBGL_compressed_texture_astc': {
            'COMPRESSED_RGB_ATC_WEBGL': 35986,
            'COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL': 35986,
            'COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL': 34798
        },
        'WEBGL_compressed_texture_etc': {
            'COMPRESSED_R11_EAC': 37488,
            'COMPRESSED_SIGNED_R11_EAC': 37489,
            'COMPRESSED_RG11_EAC': 37490,
            'COMPRESSED_SIGNED_RG11_EAC': 37491,
            'COMPRESSED_RGB8_ETC2': 37492,
            'COMPRESSED_RGBA8_ETC2_EAC': 37493,
            'COMPRESSED_SRGB8_ETC2': 37494,
            'COMPRESSED_SRGB8_ALPHA8_ETC2_EAC': 37495,
            'COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2': 37496,
            'COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2': 37497
        },
        'WEBGL_compressed_texture_s3tc': {
            'MAX_TEXTURE_MAX_ANISOTROPY_EXT': 34047,
            'TEXTURE_MAX_ANISOTROPY_EXT': 34046
        },
        'WEBGL_compressed_texture_s3tc_srgb': {},
    };


    // Fake data from an ArrayBufferView object
    function fakePixelData(pixels) {
        Math.seedrandom(seed);

        // TODO: Need a faster and more effective spoofing algorithm
        // TODO: Could the value be cached?
        for (var i = 0; i < pixels.length; i++) {
            pixels[i] += (randomBoolean() ? 1 : -1);
        }

        return pixels;
    }

    //Определение необходимых функций из WebGLExtensions
    function loseContext() {
    };

    function restoreContext() {
    };

    function drawBuffersWEBGL() {
    };

    var extensions = {
        'OES_texture_float': {},
        'OES_texture_half_float': {
            'HALF_FLOAT_OES': 36193
        },
        'WEBGL_lose_context': {
            loseContext,
            restoreContext
        },
        'OES_standard_derivatives': {
            'FRAGMENT_SHADER_DERIVATIVE_HINT_OES': 35723
        },
        'OES_vertex_array_object': {
            'VERTEX_ARRAY_BINDING_OES': 34229
        },
        'WEBGL_debug_renderer_info': {
            'UNMASKED_VENDOR_WEBGL': 37445,
            'UNMASKED_RENDERER_WEBGL': 37446
        },
        'WEBGL_debug_shaders': {},
        'WEBGL_depth_texture': {
            'UNSIGNED_INT_24_8_WEBGL': 34042
        },
        'OES_element_index_uint': {},
        'EXT_texture_filter_anisotropic': {
            'MAX_TEXTURE_MAX_ANISOTROPY_EXT': 34047,
            'TEXTURE_MAX_ANISOTROPY_EXT': 34046
        },
        'EXT_frag_depth': {},
        'WEBGL_draw_buffers': {
            'MAX_DRAW_BUFFERS_WEBGL': 34852,
            'MAX_COLOR_ATTACHMENTS_WEBGL': 36063,
            'DRAW_BUFFER9_WEBGL': 34862,
            'DRAW_BUFFER8_WEBGL': 34861,
            'DRAW_BUFFER7_WEBGL': 34860,
            'DRAW_BUFFER6_WEBGL': 34859,
            'DRAW_BUFFER5_WEBGL': 34858,
            'DRAW_BUFFER4_WEBGL': 34857,
            'DRAW_BUFFER3_WEBGL': 34856,
            'DRAW_BUFFER2_WEBGL': 34855,
            'DRAW_BUFFER15_WEBGL': 34868,
            'DRAW_BUFFER14_WEBGL': 34867,
            'DRAW_BUFFER13_WEBGL': 34866,
            'DRAW_BUFFER12_WEBGL': 34865,
            'DRAW_BUFFER11_WEBGL': 34864,
            'DRAW_BUFFER10_WEBGL': 34863,
            'DRAW_BUFFER1_WEBGL': 34854,
            'DRAW_BUFFER0_WEBGL': 34853,
            'COLOR_ATTACHMENT9_WEBGL': 36073,
            'COLOR_ATTACHMENT8_WEBGL': 36072,
            'COLOR_ATTACHMENT7_WEBGL': 36071,
            'COLOR_ATTACHMENT6_WEBGL': 36070,
            'COLOR_ATTACHMENT5_WEBGL': 36069,
            'COLOR_ATTACHMENT4_WEBGL': 36068,
            'COLOR_ATTACHMENT3_WEBGL': 36067,
            'COLOR_ATTACHMENT2_WEBGL': 36066,
            'COLOR_ATTACHMENT15_WEBGL': 36079,
            'COLOR_ATTACHMENT14_WEBGL': 36078,
            'COLOR_ATTACHMENT13_WEBGL': 36077,
            'COLOR_ATTACHMENT12_WEBGL': 36076,
            'COLOR_ATTACHMENT11_WEBGL': 36075,
            'COLOR_ATTACHMENT10_WEBGL': 36074,
            'COLOR_ATTACHMENT1_WEBGL': 36065,
            'COLOR_ATTACHMENT0_WEBGL': 36064,
            drawBuffersWEBGL
        },
        'ANGLE_instanced_arrays': {
            'VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE': 35070
        },
        'OES_texture_float_linear': {},
        'OES_texture_half_float_linear': {},
        'EXT_blend_minmax': {},
        'EXT_shader_texture_lod': {},
        'WEBGL_compressed_texture_atc': null,
        'WEBGL_compressed_texture_pvrtc': {
            'COMPRESSED_RGB_PVRTC_4BPPV1_IMG': 35840,
            'COMPRESSED_RGBA_PVRTC_4BPPV1_IMG': 35842,
            'COMPRESSED_RGB_PVRTC_2BPPV1_IMG': 35841,
            'COMPRESSED_RGBA_PVRTC_2BPPV1_IMG': 35843
        },
        'EXT_color_buffer_half_float': {},
        'WEBGL_color_buffer_float': {
            'RGBA32F_EXT': 34836,
            'RGB32F_EXT': 34837,
            'FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT': 33297,
            'UNSIGNED_NORMALIZED_EXT': 35863
        },
        'EXT_sRGB': {
            'SRGB_EXT': 35904,
            'SRGB_ALPHA_EXT': 35906,
            'SRGB8_ALPHA8_EXT': 35907,
            'FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING_EXT': 33296
        },
        'WEBGL_compressed_texture_etc1': {
            'COMPRESSED_RGB_ETC1_WEBGL': 36196
        },
        'WEBGL_compressed_texture_astc': {
            'COMPRESSED_RGB_ATC_WEBGL': 35986,
            'COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL': 35986,
            'COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL': 34798
        },
        'WEBGL_compressed_texture_etc': {
            'COMPRESSED_R11_EAC': 37488,
            'COMPRESSED_SIGNED_R11_EAC': 37489,
            'COMPRESSED_RG11_EAC': 37490,
            'COMPRESSED_SIGNED_RG11_EAC': 37491,
            'COMPRESSED_RGB8_ETC2': 37492,
            'COMPRESSED_RGBA8_ETC2_EAC': 37493,
            'COMPRESSED_SRGB8_ETC2': 37494,
            'COMPRESSED_SRGB8_ALPHA8_ETC2_EAC': 37495,
            'COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2': 37496,
            'COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2': 37497
        },
        'WEBGL_compressed_texture_s3tc': {
            'MAX_TEXTURE_MAX_ANISOTROPY_EXT': 34047,
            'TEXTURE_MAX_ANISOTROPY_EXT': 34046
        },
        'WEBGL_compressed_texture_s3tc_srgb': {},
    };


    const enabledExtensions = [
        'OES_standard_derivatives',
    ]

    let _extensions = {}
    enabledExtensions.forEach(function (v) {
        _extensions[v] = extensions[v];
    })


    // Replace the real canvas reference with a fake one
    function fakeCanvas(canvas) {
        // First get a reference to the correct context type for "this" canvas
        var ctx = HTMLCanvasElement.prototype.getContext.call(canvas, "2d") ||
            HTMLCanvasElement.prototype.getContext.call(canvas, "webgl") ||
            HTMLCanvasElement.prototype.getContext.call(canvas, "experimental-webgl") ||
            HTMLCanvasElement.prototype.getContext.call(canvas, "webgl2") ||
            HTMLCanvasElement.prototype.getContext.call(canvas, "experimental-webgl2");

        var image;

        // Extract the pixel data. Method varies depending on the rendering context's type
        if (ctx instanceof CanvasRenderingContext2D) {
            image = originalGetImageData.call(ctx, 0, 0, canvas.width, canvas.height);
        } else if (ctx instanceof WebGLRenderingContext || ctx instanceof WebGL2RenderingContext) {
            image = new ImageData(canvas.width, canvas.height);
            originalReadPixels.call(ctx, 0, 0, canvas.width, canvas.height, ctx.RGBA, ctx.UNSIGNED_BYTE, image.data);
        } else if (ctx instanceof ImageBitmapRenderingContext) {
            // No methods for pixel data extraction. Nothing to do here ...
            // TODO: Could this be used to fingerprint?
        }

        // Fake the underlying pixel data
        var fakeImage = fakeImageData(image);

        // Create a deep copy (clone) of the canvas
        var fakeCanvas = canvas.cloneNode(true);

        // Get a 2D context to draw on the fake canvas
        var fakeCtx = fakeCanvas.getContext("2d");

        // Obscure the canvas with fake pixel data
        fakeCtx.putImageData(fakeImage, 0, 0);

        return fakeCanvas;
    }


    // CanvasRenderingContext2D specific method for extracting image data from a canvas.
    CanvasRenderingContext2D.prototype.getImageData = function (sx, sy, sw, sh) {
        console.log("[ALERT] " + window.location.hostname + " called CanvasRenderingContext2D.getImageData()");

        var image = originalGetImageData.call(this, sx, sy, sw, sh);

        return fakeImageData(image);
    };

    // WebGLRenderingContext specific method for extracting pixel data from a canvas.
    WebGLRenderingContext.prototype.readPixels = function (x, y, width, height, format, type, pixels) {
        console.log("[ALERT] " + window.location.hostname + " called WebGLRenderingContext.readPixels()");

        originalReadPixels.call(this, x, y, width, height, format, type, pixels);

        fakePixelData(pixels);
    };

    if (IS_WEBGL2) {
        WebGL2RenderingContext.prototype.readPixels = function (x, y, width, height, format, type, pixels) {
            console.log("[ALERT] " + window.location.hostname + " called WebGL2RenderingContext.readPixels()");

            originalReadPixelsTwo.call(this, x, y, width, height, format, type, pixels);

            fakePixelData(pixels);
        };

        WebGL2RenderingContext.prototype.getParameter = function () {
            var name = arguments[0];
            console.log("WebGL2RenderingContext - getParameter: " + name);
            var name = arguments[0];
            console.log("WebGL2RenderingContext - getParameter: " + name);
            if (name == 37445) {
                // UNMASKED_VENDOR_WEBGL
                return unmaskedvendorwebgl;
            } else if (name == 37446) {
                // UNMASKED_RENDERER_WEBGL
                return unmaskedrendererwebgl;
            } else if (name == 7937) {
                // WebGL Context Info RENDERER
                return webglrenderer;
            } else if (name == 7936) {
                // WebGL Context Info VENDOR
                return webglvendor;
            } else if (name == 35724) {
                // SHADING_LANGUAGE_VERSION
                return shadinglanguageversion;
            } else if (name == 7938) {
                // GL VERSION
                return glversion;
            } else if (name == 33901) {
                // ALIASED_LINE_WIDTH_RANGE
                return aliasedlinewidthrange;
            } else if (name == 33902) {
                // ALIASED_POINT_SIZE_RANGE
                return aliasedpointsizerange;
            }
            //3413-3410 RGBA Bits:  [0, 0, 0, 0]
            else if (name == 3413) {
                //ALPHA_BITS
                return alphabits;
            } else if (name == 3412) {
                // BLUE_BITS
                return bluebits;
            } else if (name == 3411) {
                // GREEN_BITS
                return greenbits;
            } else if (name == 3410) {
                // RED_BITS
                return redbits;
            } else if (name == 34852) {
                //MAX_DRAW_BUFFERS_WEBGL (ext(WEBGL_draw_buffers))  EXT
                return maxdrawbufferswebgl;
            } else if (name == 3415) {
                //STENCIL_BITS
                return stencilbits;
            } else if (name == 3414) {
                //DEPTH_BITS
                return depthbits;
            } else if (name == 34047) {
                // MAX_TEXTURE_MAX_ANISOTROPY_EXT
                return maxtexturemaxanisotropyext;
            } else if (name == 34921) {
                // MAX_VERTEX_ATTRIBS
                return maxvertexattribs;
            } else if (name == 35661) {
                // MAX_COMBINED_TEXTURE_IMAGE_UNITS
                return maxcombinedtextureimageunits;
            } else if (name == 34076) {
                // MAX_CUBE_MAP_TEXTURE_SIZE
                return maxcubemaptexturesize;
            } else if (name == 34024) {
                // MAX_RENDERBUFFER_SIZE
                return maxrenderbuffersize;
            } else if (name == 3379) {
                // MAX_TEXTURE_SIZE
                return maxtexturesize;
            } else if (name == 36349) {
                // MAX_FRAGMENT_UNIFORM_VECTORS
                return maxfragmentuniformvectors;
            } else if (name == 36347) {
                // MAX_VERTEX_UNIFORM_VECTORS
                return maxvertexuniformvectors;
            } else if (name == 34930) {
                // MAX_TEXTURE_IMAGE_UNITS
                return maxtextureimageunits;
            } else if (name == 36348) {
                // MAX_VARYING_VECTORS
                return maxvaryingvectors;
            } else if (name == 35660) {
                // MAX_VERTEX_TEXTURE_IMAGE_UNITS
                return maxvertextextureimageunits;
            } else if (name == 3386) {
                //MAX_VIEWPORT_DIMS
                var maxviewportdimsint32array = new Int32Array([maxviewportdims, maxviewportdims]);
                return maxviewportdimsint32array;
            }

            if (name == 35658) {
                //MAX_VERTEX_UNIFORM_COMPONENTS
                return maxvertexuniformcomponents;
            } else if (name == 35371) {
                //MAX_VERTEX_UNIFORM_BLOCKS
                return maxvertexuniformblocks;
            } else if (name == 37154) {
                //MAX_VERTEX_OUTPUT_COMPONENTS
                return maxvertexoutputcomponents;
            } else if (name == 35659) {
                //MAX_VARYING_COMPONENTS
                return maxvaryingcomponents;
            } else if (name == 35978) {
                //MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS
                return maxtransformfeedbackinterleavedcomponents;
            } else if (name == 35979) {
                //MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS
                return maxtransformfeedbackseparateattribs;
            } else if (name == 35968) {
                //MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS
                return maxtransformfeedbackseparatecomponents;
            } else if (name == 35657) {
                //MAX_FRAGMENT_UNIFORM_COMPONENTS
                return maxfragmentuniformcomponents;
            } else if (name == 35373) {
                //MAX_FRAGMENT_UNIFORM_BLOCKS
                return maxfragmentuniformblocks;
            } else if (name == 37157) {
                //MAX_FRAGMENT_INPUT_COMPONENTS
                return maxfragmentinputcomponents;
            } else if (name == 35076) {
                //MIN_PROGRAM_TEXEL_OFFSET
                return minprogramtexeloffset;
            } else if (name == 35077) {
                //MAX_PROGRAM_TEXEL_OFFSET
                return maxprogramtexeloffset;
            } else if (name == 34852) {
                //MAX_DRAW_BUFFERS
                return maxdrawbuffers;
            } else if (name == 36063) {
                //MAX_COLOR_ATTACHMENTS
                return maxcolorattachments;
            } else if (name == 36183) {
                //MAX_SAMPLES
                return maxsamples;
            } else if (name == 32883) {
                //MAX_3D_TEXTURE_SIZE
                return max3dtexturesize;
            } else if (name == 35071) {
                //MAX_ARRAY_TEXTURE_LAYERS
                return maxarraytexturelayers;
            } else if (name == 34045) {
                //MAX_TEXTURE_LOD_BIAS
                return maxtexturelodbias;
            } else if (name == 35375) {
                //MAX_UNIFORM_BUFFER_BINDINGS
                return maxuniformbufferbindings;
            } else if (name == 35376) {
                //MAX_UNIFORM_BLOCK_SIZE
                return maxuniformblocksize;
            } else if (name == 35380) {
                //UNIFORM_BUFFER_OFFSET_ALIGNMENT
                return uniformbufferoffsetalignment;
            } else if (name == 35374) {
                //MAX_COMBINED_UNIFORM_BLOCKS
                return maxcombineduniformblocks;
            } else if (name == 35377) {
                //MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS
                return maxcombinedvertexuniformcomponents;
            } else if (name == 35379) {
                //MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS
                return maxcombinedfragmentuniformcomponents;
            }
        }

        // //Выбирается и определяется список расширений для спуфинга
        WebGL2RenderingContext.prototype.getSupportedExtensions = function () {
            try {
                console.log("WebGL2RenderingContext.getSupportedExtensions")
                var availableExtensions = Object.keys(_extensions);
                console.log(availableExtensions);
                return availableExtensions;
            } catch (a) {
                console.log(`ERROR:: ${a}`)
                return Object.keys(extensions);
            }
        }

    } else {
        // WebGL2RenderingContext = null;
        // window.WebGL2RenderingContext = null;
        HTMLCanvasElement.prototype.getContext = function (type, attrs) {

            if ((type == 'webgl2') && (!IS_WEBGL2)) {
                return null;

            }

            return originalGetContext.call(this, type, attrs);
        };

    }


    WebGLRenderingContext.prototype.getParameter = function () {
        var name = arguments[0];
        console.log("WebGL2RenderingContext - getParameter: " + name);
        if (name == 37445) {
            // UNMASKED_VENDOR_WEBGL
            return unmaskedvendorwebgl;
        } else if (name == 37446) {
            // UNMASKED_RENDERER_WEBGL
            return unmaskedrendererwebgl;
        } else if (name == 7937) {
            // WebGL Context Info RENDERER
            return webglrenderer;
        } else if (name == 7936) {
            // WebGL Context Info VENDOR
            return webglvendor;
        } else if (name == 35724) {
            // SHADING_LANGUAGE_VERSION
            return shadinglanguageversion;
        } else if (name == 7938) {
            // GL VERSION
            return glversion;
        } else if (name == 33901) {
            // ALIASED_LINE_WIDTH_RANGE
            return aliasedlinewidthrange;
        } else if (name == 33902) {
            // ALIASED_POINT_SIZE_RANGE
            return aliasedpointsizerange;
        }
        //3413-3410 RGBA Bits:  [0, 0, 0, 0]
        else if (name == 3413) {
            //ALPHA_BITS
            return alphabits;
        } else if (name == 3412) {
            // BLUE_BITS
            return bluebits;
        } else if (name == 3411) {
            // GREEN_BITS
            return greenbits;
        } else if (name == 3410) {
            // RED_BITS
            return redbits;
        } else if (name == 34852) {
            //MAX_DRAW_BUFFERS_WEBGL (ext(WEBGL_draw_buffers))  EXT
            return maxdrawbufferswebgl;
        } else if (name == 3415) {
            //STENCIL_BITS
            return stencilbits;
        } else if (name == 3414) {
            //DEPTH_BITS
            return depthbits;
        } else if (name == 34047) {
            // MAX_TEXTURE_MAX_ANISOTROPY_EXT
            return maxtexturemaxanisotropyext;
        } else if (name == 34921) {
            // MAX_VERTEX_ATTRIBS
            return maxvertexattribs;
        } else if (name == 35661) {
            // MAX_COMBINED_TEXTURE_IMAGE_UNITS
            return maxcombinedtextureimageunits;
        } else if (name == 34076) {
            // MAX_CUBE_MAP_TEXTURE_SIZE
            return maxcubemaptexturesize;
        } else if (name == 34024) {
            // MAX_RENDERBUFFER_SIZE
            return maxrenderbuffersize;
        } else if (name == 3379) {
            // MAX_TEXTURE_SIZE
            return maxtexturesize;
        } else if (name == 36349) {
            // MAX_FRAGMENT_UNIFORM_VECTORS
            return maxfragmentuniformvectors;
        } else if (name == 36347) {
            // MAX_VERTEX_UNIFORM_VECTORS
            return maxvertexuniformvectors;
        } else if (name == 34930) {
            // MAX_TEXTURE_IMAGE_UNITS
            return maxtextureimageunits;
        } else if (name == 36348) {
            // MAX_VARYING_VECTORS
            return maxvaryingvectors;
        } else if (name == 35660) {
            // MAX_VERTEX_TEXTURE_IMAGE_UNITS
            return maxvertextextureimageunits;
        } else if (name == 3386) {
            //MAX_VIEWPORT_DIMS
            var maxviewportdimsint32array = new Int32Array([maxviewportdims, maxviewportdims]);
            return maxviewportdimsint32array;
        }
    }

    // HTMLCanvasElement methods. These work on a HTMLCanvasElement object.
    // HTMLCanvasElement.prototype.toDataURL = function (type, encoderOptions) {
    //     console.log("[ALERT] " + window.location.hostname + " called HTMLCanvasElement.toDataURL()");
    //
    //     var fake = fakeCanvas(this);
    //
    //     return originalToDataURL.call(fake, type, encoderOptions);
    // };

    HTMLCanvasElement.prototype.toBlob = function (callback, mimeType, qualityArgument) {
        console.log("[ALERT] " + window.location.hostname + " called HTMLCanvasElement.toBlob()");

        var fake = fakeCanvas(this);

        originalToBlob.call(fake, callback, mimeType, qualityArgument);
    };

    HTMLCanvasElement.prototype.mozGetAsFile = function (name, type) {
        console.log("[ALERT] " + window.location.hostname + " called HTMLCanvasElement.mozGetAsFile()");

        var fake = fakeCanvas(this);

        return originalMozGetAsFile.call(fake, name, type);
    };

    WebGLRenderingContext.prototype.getSupportedExtensions = function () {
        try {
            console.log("WebGL2RenderingContext.getSupportedExtensions")
            var availableExtensions = Object.keys(_extensions);
            console.log(availableExtensions);
            return availableExtensions;
        } catch (a) {
            console.log(`ERROR:: ${a}`)
            return Object.keys(extensions);
        }
    }

})();