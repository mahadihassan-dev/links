var oTable;
jQuery(document).ready(function($) {
    prod_img_src =
        location.protocol +
        "//" +
        location.host +
        "/wp-content/themes/seobutler/images/homepage/gp-bundles.png";
    $(".bn-prod img").attr("src", prod_img_src);

    $(".bnp-title").text("Guest Post");
    $(".bnp-url").text("Excellent choice!");

    fe_price = 0;
    links_selected = {};
    links_selected.site_ids = [];
    links_selected.links = [];
    links_selected.product = "gp";
    usenext = false;
    selected_links = {};

    $(".showhidefilters").click(function() {
        filtering = false;
        $(".mcafw").removeClass("showmc");
        $(".filtersbutton").show();
        $(this).hide();
    });

    is_mobile = false;

    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|Opera Mobi/i.test(
            navigator.userAgent
        )
    ) {
        $(".uithw").css("display", "flex");
        is_mobile = true;
    }

    if (is_mobile) {
        var $ltbl = $("#gp-links-table");
        $ltbl.find("tr").each(function() {
            var $this = $(this);
            //var lw = $this.find(".tdcats .liw")[0];
            //debugger;
            var td = $("<td>").addClass("links-mob-fields")[0];
            //td.appendChild(lw);
            this.appendChild(td);
        });

        //	$(document).on('click', 'tbody tr', function(e) {
        //
        //
        //		 if ($(e.target).closest('.liw-url, .liw-anchor').length > 0) {
        //	        return false;
        //		}
        //
        //		if ($(this).find('.sitechekbx').is(':checked')) {
        //         	$(this).find('.sitechekbx').prop('checked', false).change();
        //         	$(this).removeClass('mobsellink');
        //        }
        //
        //	        else {
        //	    		$(this).find('.sitechekbx').prop('checked', true).change();
        //	    		$(this).addClass('mobsellink');
        //	        }
        //
        //	});
    }

    $.getScript(
        "https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"
    ).done(function(script, textStatus) {
        $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
            //var tblSrch = $(".table-srch").val().toLowerCase().trim();

            var flts = {};
            var $filts = $(".filter-filter-item");
            //$filts.each(function(){
            //var t = this.dataset.type;
            //var name = this.dataset.name;
            //if(!flts[name])
            //    flts[name] = [];
            //if(t == 'range'){
            //    flts[name].push([parseInt(this.dataset.from), parseInt(this.dataset.to)]);
            //}
            //else{
            //    flts[name].push(this.dataset.value);
            //}

            //if()

            var $tdl = $(".flt-tdl");
            var $cat = $(".flt-cat");
            var $strs = $(".table-filter-ration.starr.active");

            var $selected = $tdl.find("option:selected");
            var $cats = $cat.find("option:selected");

            var site_id_value = parseInt($(".flt-id").val());
            var srMinV = parseInt($(".flt-sr-min").val());
            var srMaxV = parseInt($(".flt-sr-max").val());
            var daMinV = parseInt($(".flt-da-min").val());
            var daMaxV = parseInt($(".flt-da-max").val());
            var drMinV = parseInt($(".flt-dr-min").val());
            var drMaxV = parseInt($(".flt-dr-max").val());
            var rdMinV = parseInt($(".flt-rd-min").val());
            var rdMaxV = parseInt($(".flt-rd-max").val());
            var otMinV = parseInt($(".flt-ot-min").val());
            var otMaxV = parseInt($(".flt-ot-max").val());
            var priceMinV = parseInt($(".flt-price-min").val());
            var priceMaxV = parseInt($(".flt-price-max").val());

            var site_id = +data[1];
            var dCat = data[2];
            var dSr = +data[3];
            var dTdl = data[4];
            var dDa = +data[5];
            var dDr = +data[6];
            var dRd = +data[7];
            var dOt = +data[8];
            var dPrice = +data[9].substr(1);

            var good = true;
            //if(!isNaN(srMinV) && srMinV > dSr)
            //    good = false;
            //if(!isNaN(srMaxV) && srMaxV < dSr)
            //    good = false;
            if (!isNaN(site_id_value) && site_id_value != site_id) good = false;
            if (!isNaN(daMinV) && daMinV > dDa) good = false;
            if (!isNaN(daMaxV) && daMaxV < dDa) good = false;
            if (!isNaN(drMinV) && drMinV > dDr) good = false;
            if (!isNaN(drMaxV) && drMaxV < dDr) good = false;
            if (!isNaN(rdMinV) && rdMinV > dRd) good = false;
            if (!isNaN(rdMaxV) && rdMaxV < dRd) good = false;
            if (!isNaN(otMinV) && otMinV > dOt) good = false;
            if (!isNaN(otMaxV) && otMaxV < dOt) good = false;
            if (!isNaN(priceMinV) && priceMinV > dPrice) good = false;
            if (!isNaN(priceMaxV) && priceMaxV < dPrice) good = false;
            if ($selected.length && good) {
                good = false;
                $selected.each(function() {
                    if (this.value == dTdl) good = true;
                });
            }
            if ($cats.length && good) {
                good = false;
                $cats.each(function() {
                    if (
                        dCat.toLowerCase().indexOf(this.value.toLowerCase()) + 1
                    )
                        good = true;
                });
            }
            if ($strs.length && good) {
                good = false;
                $strs.each(function() {
                    if (+this.dataset.rating == dSr) good = true;
                });
            }

            //});

            //var good = true;
            //for(var i in flts){
            //    var lg = false;
            //    for(var j=0;j<flts[i].length;j++){
            //        var f = flts[i][j];
            //        if(i == 'sc'){
            //            if(data[1].toLowerCase().indexOf(f.toLowerCase()) >= 0)
            //                lg = true;
            //        }
            //        else if(i == 'tld'){
            //            if(data[3] == f)
            //                lg = true;
            //        }
            //        else if(i == 'price'){
            //            var n = parseInt(data[8].substr(1));
            //            if(isNaN(f[0]) && f[1] >= n || isNaN(f[1]) && f[0] <= n || f[0] <= n && f[1] >= n)
            //                lg = true;
            //        }
            //        else{
            //            var n = parseInt(data[nameToIndex[i]]);
            //            if(isNaN(f[0]) && f[1] >= n || isNaN(f[1]) && f[0] <= n || f[0] <= n && f[1] >= n)
            //                lg = true;
            //        }
            //    }
            //    good = good && lg;
            //}
            //
            //if(tblSrch && data[1].toLowerCase().indexOf(tblSrch) < 0)
            //    good = false;

            return good;
        });

        var nameToIndex = { st: 2, da: 4, dr: 5, rd: 6, ot: 7 };

        oTable = $("#gp-links-table").DataTable({
            columnDefs: [{ orderable: false, targets: 0 }],
        });

        $(".table-srch, .mcsi").keyup(function() {
            oTable.draw();
            //oTable.search($(this).val()).draw();
        });
    });

    $(".tld").click(function() {
        if ($(this).hasClass("active")) {
            //////console.log('alread active')
            oTable.column(3).search("").draw();
            $("tbody")[0].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            return false;
        }

        tld = $(this).attr("data");
        oTable.column(3).search(tld).draw();
        $("tbody")[0].scrollIntoView({ behavior: "smooth", block: "start" });
    });

    function validateEmail(value) {
        var input = document.createElement("input");

        input.type = "email";
        input.required = true;
        input.value = value;

        return typeof input.checkValidity === "function" ?
            input.checkValidity() :
            /\S+@\S+\.\S+/.test(value);
    }

    function validateModal() {
        valmod = false;

        $(".field-error").removeClass("field-error");

        user_data = {};
        user_data.name = $(".bn-name").val();
        user_data.email = $(".bn-email").val();
        user_data.country = $(".bn-country").val();
        user_data.vatno = $(".bn-vatno").val();
        user_data.address_one = $(".vat-street").val();
        user_data.postcode = $(".vat-postcode").val();
        user_data.coupon = $(".bn-coupon").val();

        error_flag = false;
        var coupon = false;

        $(".bnreq").each(function() {
            bnreqv = $(this).val();

            if (bnreqv.length < 1) {
                $(this).addClass("field-error");
                error_flag = true;
            }
        });

        if (!validateEmail($(".bn-email").val())) {
            $(".bn-email").addClass("field-error");
            error_flag = true;
        }

        if ($(".bn-vatno").val().length > 0) {
            if ($(".bn-vatno").attr("data") == "invat") {
                $(".bn-vatno").addClass("field-error");
                error_flag = true;
            }

            $("#bn-address-wrap input").each(function() {
                inval = $(this).val();

                if (inval.length < 1) {
                    $(this).addClass("field-error");
                    error_flag = true;
                }
            });
        }

        if (document.getElementById("bn-accept").checked) {
            $(".field-error-bar").hide();
            $(".bn-accept").removeClass("checkerror");
        } else {
            $(".field-error-bar").text("Please read & accept terms").show();
            $(".bn-accept").addClass("checkerror");
            error_flag = true;
        }

        $.ajax({
            async: false,
            url: location.protocol +
                "//" +
                location.host +
                "/wp-content/themes/seobutler/php/store_billing_country.php",
            type: "post",
            data: user_data,
            success: function(data) {},
        }).done(function() {
            //check or apply coupon
            if ($(".bn-coupon").val().length > 0) {
                //alert('copon fired!');

                coupon = true;

                $(".bn-coupon").removeClass("field-error");
                $(".field-error-bar").hide();

                $.ajax({
                        url: location.protocol +
                            "//" +
                            location.host +
                            "/wp-content/themes/seobutler/php/cart/apply_coupon.php",
                        type: "post",
                        data: { coupon: $(".bn-coupon").val() },
                        dataType: "json",
                        success: function(data) {
                            if (data.valid == "invalid") {
                                $(".field-error-bar").text("Coupon invalid").show();
                                $(".bn-coupon").addClass("field-error");
                                error_flag = true;
                                return false;
                            }

                            updateCartTotals(data);
                            //////console.log(data);
                        },
                        error: function(request, status, error) {
                            //////////////console.log('Error => ' + request.responseText);
                        },
                    })
                    .done(function() {
                        ////////console.log('coupon check done');
                    })
                    .fail(function() {
                        alert("Sorry. Something Went Wrong.");
                    });
            }

            ////////console.log("Errors1 == " + error_flag);

            if (error_flag) {
                return false;
            }

            if (!error_flag) {
                cart = fetchPaymentTotal();

                //do stuff.
                $.ajax({
                    url: location.protocol +
                        "//" +
                        location.host +
                        "/wp-content/themes/seobutler/php/emseq.php",
                    type: "post",
                    data: user_data,
                    success: function(data) {},
                });

                ////////console.log("Errors2 == " + error_flag);
                valmod = true;
                ////////console.log('valmod true');
            }
        });

        ////////console.log(valmod)

        if (valmod) {
            ////////console.log(error_flag);
            return true;
        }
    }

    document.getElementById("pws").addEventListener("click", function(e) {
        $(".lds-ring-wrap").addClass("lds-ring-show");

        if (validateModal()) {
            createOrder("Stripe");

            cart_totals = fetchPaymentTotal();
            stripe_total = cart_totals.cart_total * 100;

            // Open Checkout with further options:
            handler.open({
                name: "SEO Butler",
                description: "GP Order",
                currency: "usd",
                amount: stripe_total,
                panelLabel: "Pay {{amount}}",
            });
        }
    });

    var typingTimer0; //timer identifier
    var doneTypingInterval0 = 500; //time in ms, 5 second for example

    $(".bn-coupon").keyup(function() {
        $(".bn-coupon").removeClass("field-error");
        $(".field-error-bar").hide();

        clearTimeout(typingTimer0);
        typingTimer0 = setTimeout(lcheckcoupon, doneTypingInterval0);

        dcoup = $(this).val();

        function lcheckcoupon() {
            //check or apply coupon
            if (dcoup.length > 0) {
                $.ajax({
                        beforeSend: function() {
                            $(".lds-ring-wrap").addClass("lds-ring-show");
                        },
                        url: location.protocol +
                            "//" +
                            location.host +
                            "/wp-content/themes/seobutler/php/cart/apply_coupon.php",
                        type: "post",
                        data: { coupon: $(".bn-coupon").val() },
                        dataType: "json",
                        success: function(data) {
                            if (data.valid == "invalid") {
                                $(".field-error-bar").text("Coupon invalid").show();
                                $(".bn-coupon").addClass("field-error");
                                $(".lds-ring-wrap").removeClass("lds-ring-show");
                                error_flag = true;
                                return false;
                            }

                            //update values
                            $(".bnt-str span").text(data.cart_subtotal);
                            $(".bnt-vr span").text(data.cart_tax_total);
                            $(".bnt-tr span").text(data.cart_total);

                            loadBraintree("couponcheck");
                            $(".lds-ring-wrap").removeClass("lds-ring-show");
                        },
                        error: function(request, status, error) {
                            ////////console.log('Error => ' + request.responseText);
                        },
                    })
                    .done(function() {
                        console.log("coupon check done");
                    })
                    .fail(function() {
                        alert("Sorry. Something Went Wrong.");
                    });
            }
        }
    });

    paynowmarker = false;

    document.getElementById("paynow").addEventListener("click", function(e) {
        if (validateModal()) {
            /////console.log('modal validated');
            $(this).hide();
            $(".pws, #paypal-button, #updeets").css("display", "flex");
            $(
                "#bn-cartinfo-wrap input, #bn-cartinfo-wrap form, .bn-tacs, #updeets"
            ).hide();
            $("#back-b").css("display", "inline-flex");
            paynowmarker = true;
            loadBraintree();
            $("#dropin-container").show();
        }
    });

    document.getElementById("updeets").addEventListener("click", function(e) {
        validateModal();
        loadBraintree("updeets");
    });

    document.getElementById("back-b").addEventListener("click", function(e) {
        $(
            "#bn-cartinfo-wrap input, #bn-cartinfo-wrap form, .bn-tacs, #updeets, #paynow"
        ).show();
        $("#back-b, #dropin-container").hide();
    });

    order_id = 0;

    function createOrder(payment_method) {
        if (order_id > 0) {
            oidd = {};
            oidd.order_id = order_id;

            //delete previous order
            $.ajax({
                //url: location.protocol + '//' + location.host + '/wp-content/plugins/woocom-magic-theo/stripe/charge.php',
                url: location.protocol +
                    "//" +
                    location.host +
                    "/wp-content/themes/seobutler/php/delete_order.php",
                type: "post",
                data: oidd,
                success: function(d) {
                    ////////console.log(d);
                },
            });
        }

        user_data.payment_method = payment_method;

        $(".lds-ring-wrap").addClass("lds-ring-show");

        $.ajax({
            //url: location.protocol + '//' + location.host + '/wp-content/plugins/woocom-magic-theo/stripe/charge.php',
            url: location.protocol +
                "//" +
                location.host +
                "/wp-content/themes/seobutler/php/paypal/add_order.php",
            type: "post",
            data: user_data,
            async: false,
            success: function(d) {
                order_id = d;
                $(".lds-ring-wrap").removeClass("lds-ring-show");
            },
        });
    }

    function loadStripe() {
        /////////////////console.log('loading stripe');
        $.getScript("https://checkout.stripe.com/checkout.js")
            .done(function(script, textStatus) {
                $(".lds-ring-wrap").removeClass("lds-ring-show");

                function stripeCharge(token) {
                    $(".lds-ring-wrap").addClass("lds-ring-show");

                    var stripeData = {};
                    stripeData.token = token["id"];
                    stripeData.order_id = order_id;

                    $.ajax({
                        url: location.protocol +
                            "//" +
                            location.host +
                            "/wp-content/themes/seobutler/php/stripe/charge.php",
                        type: "post",
                        data: stripeData,
                        success: function(d) {
                            ////////console.log(d);

                            if (d == "error") {
                                $(
                                    ".order-placed-image, .order-placed-buttons"
                                ).remove();
                                $(".order-placed-title").text("Oops!");
                                $(".order-placed-subtitle").text(
                                    "Something went wrong."
                                );

                                $(".lds-ring-wrap").removeClass(
                                    "lds-ring-show"
                                );
                                $("#bn-cartinfo-wrap, #bn-ex").hide();
                                $("#tick").addClass("teckrel");
                                $(".trigger").toggleClass("drawn");
                            } else {
                                $(".lds-ring-wrap").removeClass(
                                    "lds-ring-show"
                                );
                                $("#bn-cartinfo-wrap, #bn-ex").hide();
                                $("#tick").addClass("teckrel");
                                $(".trigger").toggleClass("drawn");
                            }
                        },
                        error: function(
                            XMLHttpRequest,
                            textStatus,
                            errorThrown
                        ) {
                            alert("Status: " + textStatus);
                            alert("Error: " + errorThrown);
                        },
                    });
                }

                handler = StripeCheckout.configure({
                    key: "pk_live_5xSdOSKFlMzlLJ8seoUE4S5O",
                    image: "https://stripe.com/img/documentation/checkout/marketplace.png",
                    locale: "auto",
                    token: function(token) {
                        stripeCharge(token);

                        // You can access the token ID with `token.id`.
                        // Get the token ID to your server-side code for use.
                        /////////////////console.log(token);
                    },

                    opened: function() {
                        //$('.lds-ring-wrap').removeClass('lds-ring-show');
                    },
                    closed: function() {
                        //$('.lds-ring-wrap').removeClass('lds-ring-show');
                    },
                });
            })
            .fail(function(jqxhr, settings, exception) {
                alert("something went wrong!");
            });
    }

    function storeOrder(links_selected) {
        if (number_links_selected > 1) {
            $(".bnp-title").text("Guest Posts");
            $(".bnp-url").text("" + number_links_selected + " Links");
        } else if (number_links_selected == 1) {
            $(".bnp-title").text("Guest Post");
            $(".bnp-url").text("1 Link");
        }

        /*////console.log(links_selected);

		$.each(links_selected['links'], function( key, value ) {
				////console.log(value);
		});*/

        //alert("storeOrder");

        //////console.log('storing order');
        //////console.log(links_selected);

        $.ajax({
            url: location.protocol +
                "//" +
                location.host +
                "/wp-content/themes/seobutler/php/order_store.php",
            type: "post",
            data: links_selected,
            dataType: "json",
            success: function(d) {
                //////console.log('done! order store hi');
                //////console.log(d);
                //$('.lds-ring-wrap').addClass('lds-ring-show');
                //$('#modal-checkout-wrap').addClass('mcw-active').stop().fadeTo("fast" , 1);
            },
        }).done(function(data) {
            ////////console.log(data);

            $(".bnp-title span").remove();

            //update totals in modal
            vatOwed = parseFloat(data.vat_owed);
            subTotal = parseFloat(data.subtotal);
            totalWithVat = subTotal + vatOwed;

            $(".bnt-str span").text(subTotal.toFixed(2));
            $(".bnt-vr span").text(vatOwed.toFixed(2));
            $(".bnt-tr span").text(parseFloat(totalWithVat).toFixed(2));
            $(".bn-prod-price span").text(subTotal.toFixed(2));

            loadStripe();
            loadPayPal(updatePayPal);
            updatePayPal = true;
        });
    }

    //This prototype function allows you to remove even array from array
    Array.prototype.remove = function(x) {
        var i;
        for (i in this) {
            if (this[i].toString() == x.toString()) {
                this.splice(i, 1);
            }
        }
    };

    link_info_html_old =
        '<div class="liw">\
			    		<input type="text" class="liw-url" placeholder="URL">\
			    		<input type="text" class="liw-anchor" placeholder="Anchor">\
			    		<span class="ufnwls">Use Next</span>\
			    		<div class="ichw"><input class="styled-checkbox usenext" type="checkbox" value="value1"><label></label></div>\
			    	</div>';

    link_info_html =
        '<div class="liw">\
			    		<input type="text" class="liw-url sb-product-data-field sb-product-data-required-field" placeholder="URL" name="link_url">\
			    		<input type="text" class="liw-anchor sb-product-data-field sb-product-data-required-field" placeholder="Anchor" name="link_anchor">\
			    	</div>';

    //selallchk
    /*$('table').on( 'page.dt', function () {

		////////console.log($('#gp-links-table .selallactive').length);

		
				//$('.selallchk').prop('checked', false);
	});*/

    $(document).on("click", ".paginate_button", function() {
        //////console.log($('#gp-links-table .selallactive').length);

        if ($("#gp-links-table .selallactive").length == 0) {
            $(".selallchk").prop("checked", false);
        } else if ($("#gp-links-table .selallactive").length > 0) {
            $(".selallchk").prop("checked", true);
        }
    });

    selectall = false;

    $(document).on("change", ".selallchk:checkbox", function() {
        selectall = true;

        if ($(this).is(":checked")) {
            $(".dontremove").removeClass("dontremove");
            $("tbody tr").addClass("selallactive");
            $(".sitechekbx").prop("checked", true).change();
        } else {
            $(".dontadd").removeClass("dontadd");
            $(".selallactive").removeClass("selallactive");
            $(".sitechekbx").prop("checked", false).change();
        }

        selectall = false;
    });

    $(document).on("change", ".usenext:checkbox", function() {
        if ($(this).is(":checked")) {
            usenext = true;
            usenext_url = $(this).parents(".liw").find(".liw-url").val();
            usenext_anchor = $(this).parents(".liw").find(".liw-anchor").val();
        } else {
            usenext = false;
        }
    });

    number_links_selected = 0;

    function fetchPaymentTotal() {
        payment_totals = 0;

        $(".lds-ring-wrap").addClass("lds-ring-show");

        $.ajax({
            //url: location.protocol + '//' + location.host + '/wp-content/plugins/woocom-magic-theo/stripe/charge.php',
            url: location.protocol +
                "//" +
                location.host +
                "/wp-content/themes/seobutler/php/cart/fetch_cart_totals.php",
            type: "post",
            async: false,
            dataType: "json",
            success: function(d) {
                payment_totals = d;
            },
        });

        $(".lds-ring-wrap").removeClass("lds-ring-show");

        return payment_totals;
    }

    var cart_totals = {};
    var cart = {};

    function updateCartTotals(cart) {
        cart_totals.sub_total = cart.cart_subtotal;
        cart_totals.tax_total = cart.cart_tax_total;
        cart_totals.total = cart.cart_total;

        //update values
        $(".bnt-str span").text(cart_totals.sub_total);
        $(".bnt-vr span").text(cart_totals.tax_total);
        $(".bnt-tr span").text(cart_totals.total);
    }

    function add_to_cart() {
        fbq("track", "AddToCart");

        //console.log(links_selected);

        links_selected.product = "GP";
        links_selected.quantity = 1;

        $.ajax({
            //url: location.protocol + '//' + location.host + '/wp-content/plugins/woocom-magic-theo/stripe/charge.php',
            url: location.protocol +
                "//" +
                location.host +
                "/wp-content/themes/seobutler/php/cart/add_to_cart-newt.php",
            type: "post",
            data: links_selected,
            async: false,
            success: function(d) {
                ////console.log(d);

                cart = jQuery.parseJSON(d);

                updateCartTotals(cart);

                //add content button for access later

                $(".bn-prod-price span").text(cart.cart_subtotal);
            },
        });
    }

    $(document).on("change", ".sitechekbx:checkbox", function() {
        $(this).parents("tr").toggleClass("row-selected-fp");
        site_id = $(this).parents("tr").attr("data");
        link_price = parseInt(
            $(this).parents("tr").find(".link_price span").text()
        );

        if ($(this).is(":checked")) {
            if ($(this).hasClass("dontadd") && selectall) {
                return false;
            }

            $(this).addClass("dontadd");

            //add link to cart
            //return the price

            number_links_selected++;
            links_selected.site_ids.push(site_id);
            if (is_mobile) {
                $(this)
                    .parents("tr")
                    .find(".links-mob-fields")
                    .append(link_info_html);
            } else {
                $(this).parents("tr").find(".tdcats").append(link_info_html);
            }
            if (usenext) {
                $(this).parents("tr").find(".liw-url").val(usenext_url);
                $(this).parents("tr").find(".liw-anchor").val(usenext_anchor);
                $(this).parents("tr").find(".usenext").prop("checked", true);
                links_selected.links[site_id] = {
                    link_url: usenext_url,
                    link_anchor: usenext_anchor,
                };
            }
        } else {
            if ($(this).hasClass("dontremove") && selectall) {
                return false;
            }

            $(this).addClass("dontremove");

            number_links_selected--;
            links_selected.site_ids.remove(site_id);
            delete links_selected.links[site_id];
            $(this).parents("tr").find(".liw").remove();
        }

        //check de price
        ////console.log(links_selected);

        //verify price integrity
        $.ajax({
            url: location.protocol +
                "//" +
                location.host +
                "/wp-content/themes/seobutler/php/get_links_price.php",
            type: "post",
            data: links_selected,
            dataType: "json",
            success: function(data) {
                ////console.log(data);

                if (data !== "error") {
                    //all good
                    $("#selected-price span, .tot .mnl").text("$" + data);
                    $(".lnks .mnl").text(number_links_selected);
                }
            },
        });

        //////console.log(links_selected);
    });

    $(".ble").click(function() {
        $(".blackilist-modal").removeClass("bls");
        $(".rem_count_msg").hide();
    });

    $("#blacklist").click(function() {
        $(".blackilist-modal").addClass("bls");
    });

    // Init a timeout variable to be used below
    var timeout = null;

    $(document).on("click", ".blacklist-button button", function() {
        rem_count = 0;
        $(".rem_count_msg").hide();

        clearTimeout(timeout);

        // Make a new timeout set to go off in 800ms
        timeout = setTimeout(function() {
            $(".bll").addClass("lds-ring-show");

            arrayOfLines = $(".blacklist").val().split("\n");
            // if ($('.targeturls').val().length > 0) {
            // 	arrayOfLinesTu = $('.targeturls').val().split('\n');
            //
            // 	$.ajax({
            // 	        url: location.protocol + '//' + location.host + '/wp-content/themes/seobutler/php/gp_target_urls.php',
            // 	        type: "post",
            // 	        data: {urls: arrayOfLinesTu},
            // 	        success: function(data) {
            //
            // 				//remove matched urls from datatable
            // 	        	var obj = jQuery.parseJSON(data);
            //
            // 	        	rem_count = obj.length;
            // 	        	$('.rem_count_msg span').text(rem_count);
            // 	        	$('.rem_count_msg').show();
            //
            // 	        	$.each( obj, function( key, value ) {
            // 				  	id_to_remove = value;
            // 				  	////console.log(id_to_remove);
            // 				  	row_to_remove = $("tr[data='" + id_to_remove +"']");
            //
            // 				  	if (links_selected.links[id_to_remove] !== 'undefined') {
            // 				  		//////console.log('delete match');
            // 				  		links_selected.site_ids.remove(id_to_remove);
            // 				  		delete links_selected.links[id_to_remove];
            // 				  	}
            //
            // 				  	$('#gp-links-table').DataTable().row("tr[data='" + id_to_remove +"']").remove().draw(false);
            //
            //
            // 				});
            //
            // 	        }
            // 	});
            // }

            //send data to php
            $.ajax({
                url: location.protocol +
                    "//" +
                    location.host +
                    "/wp-content/themes/seobutler/php/gp_blacklist.php",
                type: "post",
                data: { urls: arrayOfLines },
                success: function(data) {
                    //remove matched urls from datatable
                    var obj = jQuery.parseJSON(data);

                    if (rem_count > 0) {
                        rem_count = rem_count + obj.length;
                    } else {
                        rem_count = obj.length;
                    }

                    $(".rem_count_msg span").text(rem_count);
                    $(".rem_count_msg").show();

                    $.each(obj, function(key, value) {
                        id_to_remove = value["site_id"];
                        ////console.log(id_to_remove);
                        row_to_remove = $("tr[data='" + id_to_remove + "']");

                        if (
                            links_selected.links[id_to_remove] !== "undefined"
                        ) {
                            //////console.log('delete match');
                            links_selected.site_ids.remove(id_to_remove);
                            delete links_selected.links[id_to_remove];
                        }

                        $("#gp-links-table")
                            .DataTable()
                            .row("tr[data='" + id_to_remove + "']")
                            .remove()
                            .draw(false);
                        //oTable.row(row_to_remove).remove().draw(true);
                    });

                    //verify price integrity
                    $.ajax({
                        url: location.protocol +
                            "//" +
                            location.host +
                            "/wp-content/themes/seobutler/php/get_links_price.php",
                        type: "post",
                        data: links_selected,
                        dataType: "json",
                        success: function(data) {
                            ////console.log(data);
                            if (data !== "error") {
                                //all good
                                $("#selected-price span, .tot .mnl").text(
                                    "$" + data
                                );
                                $(".bll").removeClass("lds-ring-show");
                            }
                        },
                    });
                },
            });
        }, 500);
    });

    var timeout = null;

    $("#newfilter").click(function() {
        var $this = $(this);
        var $fs = $(".table-filter-section");
        $this.toggleClass("blue");
        $fs.stop().slideToggle();
    });
    $(".table-filter-section select").on("change", function() {
        oTable.draw();
    });
    $(".table-filter-section input").on("input", function() {
        oTable.draw();
    });
    $(".country_select > div").each(function() {
        $(".flt-tdl").append(
            '<option value="' +
            this.innerHTML +
            '">' +
            this.innerHTML +
            "</option>"
        );
    });
    var alltdcats = {};
    $(".tdcats").each(function() {
        var comma_check = this.innerHTML.includes(",");

        if (comma_check) {
            var single_categories = this.innerHTML.split(", ");

            $.each(single_categories, function(i) {
                catgrrree = single_categories[i];
                if (catgrrree.length > 2) {
                    alltdcats[catgrrree] = 1;
                }
            });
        } else {
            alltdcats[this.innerHTML] = 1;
        }
    });

    alltdcats = Object.keys(alltdcats);
    for (var i = 0; i < alltdcats.length; i++)
        $(".flt-cat").append(
            '<option value="' + alltdcats[i] + '">' + alltdcats[i] + "</option>"
        );
    $(".flt-tdl").cselect();
    $(".flt-cat").cselect();
    $("#table-filter-reset").click(function() {
        $(".table-filter-section input").val("");
        $(".table-filter-section select").cselect("clear");
        $(".table-filter-ration").removeClass("active");
        oTable.draw();
    });
    $("#table-filter-save").click(function() {
        $("#newfilter").click();
    });
    $(".table-filter-ration").click(function() {
        var rt = this.dataset.rating;
        this.classList.toggle("active");
        if (rt == "all") {
            if (this.classList.contains("active"))
                $(".table-filter-ration.starr").addClass("active");
            else $(".table-filter-ration.starr").removeClass("active");
        }
        if (
            $(".table-filter-ration.starr.active").length ==
            $(".table-filter-ration.starr").length
        ) {
            $(".table-filter-ration:not(.star)").addClass("active");
        } else {
            $(".table-filter-ration:not(.starr)").removeClass("active");
        }
        oTable.draw();
    });

    // Listen for keystroke events
    $(document).on("keyup", ".liw-anchor, .liw-url", function() {
        link_url = $(this).parent().find(".liw-url").val();
        link_anchor = $(this).parent().find(".liw-anchor").val();
        site_id = $(this).parents("tr").attr("data");
        usenext_url = $(this).parent().find(".liw-url").val();
        usenext_anchor = $(this).parent().find(".liw-anchor").val();
        $(".trac").removeClass("trac");
        $(".de").removeClass("de");
        $(".dea").removeClass("dea");
        parent_tr = $(this).parents("tr").addClass("trac");

        clearTimeout(timeout);

        links_selected.links[site_id] = {
            link_url: link_url,
            link_anchor: link_anchor,
        };

        if ($(this).hasClass("liw-url")) {
            //console.log(link_url.length);

            if (link_url.length > 0) {
                timeout = setTimeout(function() {
                    parent_tr.find(".tdcats").addClass("cfd");

                    //console.log(link_url);

                    gp_data_send = {};
                    gp_data_send.site_id = site_id;
                    gp_data_send.url = link_url;

                    $.ajax({
                        url: location.protocol +
                            "//" +
                            location.host +
                            "/wp-content/themes/seobutler/php/gp/check_dupes.php",
                        type: "post",
                        data: gp_data_send,
                        success: function(data) {
                            if (data == "hit") {
                                $(".trac").find(".liw-url").addClass("de");
                                $(".trac")
                                    .find(".liw-anchor")
                                    .addClass("dea")
                                    .val("Already placed");
                            }

                            parent_tr.find(".tdcats").removeClass("cfd");
                        },
                    });
                }, 2000);
            }
        }
    });

    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <MILLISECONDS>

    // Make a new timeout set to go off in 800ms

    //BUY!
    $(".table-functions-buy-button, .buynwmob").click(function() {
        block_buy = true;

        missing_data = false;

        $.ajax({
            url: location.protocol +
                "//" +
                location.host +
                "/wp-content/themes/seobutler/php/gp/check_dupes.php",
            type: "post",
            data: { kk: links_selected.links },
            async: false,
            success: function(data) {
                if (data !== "wat") {
                    data = jQuery.parseJSON(data);

                    $.each(data, function(key, value) {
                        links_selected.links.remove(value);
                        delete links_selected.links[value];
                        links_selected.site_ids.remove(value);
                        delete links_selected.site_ids[value];
                    });

                    block_buy = true;
                }
            },
        });

        $.each(links_selected.links, function(key, value) {
            if (value) {
                block_buy = false;
            }
        });

        if (block_buy) {
            return false;
        }

        $(".liw input").each(function() {
            this_data = $(this).val();

            if (this_data.length < 1) {
                missing_data = true;
            }
        });

        if (missing_data) {
            alert(
                "One of your links is missing the url or anchor. Please re-check them all."
            );
            return false;
        }

        if (number_links_selected < 1) {
            return false;
        }

        //verify price integrity
        $.ajax({
            url: location.protocol +
                "//" +
                location.host +
                "/wp-content/themes/seobutler/php/get_links_price.php",
            type: "post",
            data: links_selected,
            dataType: "json",
            success: function(data) {
                //////console.log(data);
                if (data !== "error") {
                    //all good
                    $("#selected-price span").text("$" + data);
                    add_to_cart();
                    checkoutModal();
                }
            },
        });
    });

    paypal_script_loaded = false;

    function loadPayPal() {
        if (!paypal_script_loaded) {
            $.getScript("https://www.paypalobjects.com/api/checkout.js").done(
                function(script, textStatus) {
                    paypal_script_loaded = true;

                    paypal.Button.render({
                            // Configure environment
                            env: "production",
                            client: {
                                sandbox: "ASbM4HvINkP8wVDUP91CGrgxriPDQpcSyD_QCjG2GBzoWKmFpwJkqKwLVivYMVUTHM0rmkJm6DDc8NS3",
                                production: "AcPDm68fe0FU4ROxGOsqGWkSP587sVfZSL1ysfvGFVp5fEcwumZCQySO2bb3ZZVbG6utcf59CHmBElMm",
                            },
                            // Customize button (optional)
                            locale: "en_US",
                            style: {
                                size: "responsive",
                                color: "gold",
                                shape: "pill",
                            },

                            validate: function(actions) {},

                            onClick: function() {
                                cart_totals = fetchPaymentTotal();
                                createOrder("PayPal");
                            },

                            // Set up a payment
                            payment: function(data, actions) {
                                if (!validateModal()) {
                                    return false;
                                }

                                ////////console.log(cart_totals);

                                paypal_token =
                                    Math.random()
                                    .toString(36)
                                    .substring(2, 15) +
                                    Math.random().toString(36).substring(2, 15);

                                return actions.payment.create({
                                    transactions: [{
                                        amount: {
                                            total: cart_totals.cart_total,
                                            currency: "USD",
                                            details: {
                                                subtotal: cart_totals.sub_total,
                                                tax: cart_totals.tax_total,
                                            },
                                        },
                                        notify_url: location.protocol +
                                            "//" +
                                            location.host +
                                            "/wp-content/themes/seobutler/php/paypal/ipn.php",
                                        description: "Guest Posts",
                                        custom: order_id,
                                    }, ],
                                    //note_to_payer: 'Contact us for any questions on your order '+test_var.totalWithVat+' .'
                                });
                            },
                            // Execute the payment
                            onAuthorize: function(data, actions) {
                                return actions.payment
                                    .execute()
                                    .then(function() {
                                        // Show a confirmation message to the buyer
                                        $(".lds-ring-wrap").removeClass(
                                            "lds-ring-show"
                                        );
                                        $("#bn-cartinfo-wrap, #bn-ex").hide();
                                        $("#tick").addClass("teckrel");
                                        $(".trigger").toggleClass("drawn");
                                        //window.alert('Thank you for your purchase!');
                                    });
                            },
                        },
                        "#paypal-button"
                    );
                }
            );
        }
    }

    var braintreeGlobal;

    function loadBraintree(source) {
        if (source !== "firstload" && source !== "couponcheck") {
            $(".lds-ring-wrap").addClass("lds-spec");
        }

        if (paynowmarker) {
            $(".lds-ring-wrap").addClass("lds-spec");
        }

        $("#dropin-container, .pwb").hide();

        if (braintreeGlobal) {
            braintreeGlobal.teardown(function(err) {
                if (err) {
                    console.error("An error occurred during teardown:", err);
                }
            });
        }

        clientToken = "";

        //get token
        $.ajax({
            url: location.protocol +
                "//" +
                location.host +
                "/wp-content/themes/seobutler/php/braintree/token.php",
            type: "post",
            success: function(d) {
                clientToken = d;
                //console.log(d);

                var button = document.querySelector("#submit-button");
                cart_totals = fetchPaymentTotal();

                th_payment_amount = cart_totals.cart_total;
                th_tax_amount = cart_totals.cart_tax_total;
                console.log("pam:" + th_payment_amount);
                console.log("pam:" + th_tax_amount);

                braintree.dropin.create({
                        authorization: clientToken,
                        container: "#dropin-container",
                        threeDSecure: {
                            amount: th_payment_amount,
                        },
                        paypal: {
                            flow: "checkout",
                            amount: th_payment_amount,
                            currency: "USD",
                        },
                    },
                    function(createErr, instance) {
                        console.log(createErr);

                        if (
                            source !== "firstload" &&
                            source !== "couponcheck" &&
                            source !== "updeets"
                        ) {
                            $("#dropin-container").show();
                            $(".lds-ring-wrap").removeClass("lds-spec");
                        }

                        if (paynowmarker) {
                            $("#dropin-container").show();
                            $(".lds-ring-wrap").removeClass("lds-spec");
                        }

                        if (source == "updeets") {
                            $(".lds-ring-wrap").removeClass("lds-spec");
                        }

                        $(document).on(
                            "click",
                            ".braintree-option__card",
                            function() {
                                $(".pwb").show();
                            }
                        );

                        $(document).on(
                            "click",
                            ".braintree-option__paypal",
                            function() {
                                $(".pwb").show();
                            }
                        );

                        $(document).on(
                            "click",
                            ".braintree-toggle",
                            function() {
                                $(".pwb").hide();
                            }
                        );

                        braintreeGlobal = instance;

                        button.addEventListener("click", function() {
                            console.log("clicker");

                            instance.requestPaymentMethod(function(
                                error,
                                payload
                            ) {
                                console.log("error");
                                console.log(error);
                                console.log("payload");
                                console.log(payload);

                                //show loader
                                $(".lds-ring-wrap").addClass("lds-spec");

                                if (error) {
                                    //show error messages
                                    console.error(error.message);
                                    $(".lds-ring-wrap").removeClass("lds-spec");
                                    return;
                                } else {
                                    if (
                                        payload.liabilityShifted ||
                                        payload.type !== "CreditCard"
                                    ) {
                                        payload.th_payment_amount =
                                            th_payment_amount;
                                        payload.th_tax_amount =
                                            cart_totals.cart_tax_total;
                                        payload.th_order_id = order_id;
                                        createOrder("Braintree");

                                        $.ajax({
                                            url: location.protocol +
                                                "//" +
                                                location.host +
                                                "/wp-content/themes/seobutler/php/braintree/payment.php",
                                            type: "post",
                                            data: payload,
                                            success: function(d) {
                                                var d = JSON.parse(d);

                                                if (d.error) {
                                                    $(".brain-err").text(
                                                        d.error
                                                    );
                                                    $(".brain-err").show();
                                                    $(
                                                        ".lds-ring-wrap"
                                                    ).removeClass("lds-spec");
                                                    instance.clearSelectedPaymentMethod();
                                                    return;
                                                }

                                                //everything worked fine
                                                gtag(
                                                    "event",
                                                    "PayPal Checked Out", {
                                                        event_category: "Modal",
                                                        value: th_payment_amount,
                                                    }
                                                );

                                                fbq("track", "Purchase", {
                                                    value: th_payment_amount,
                                                    currency: "USD",
                                                });

                                                // var actid = "66560772"; // your ActiveCampaign id. You can get this from your AC settings
                                                //  var eventKey = "7bf159a095e9baf96013627ab19dc32e4c6735ee"; // your event key, also in AC settings
                                                //  var event = "Purchased" // whatever event you want to track. It would be a better idea to "DRY" this up, and pass the event name as a parameter into the function, so you can track any event with one function
                                                //  var eventData = window.location.href; // what else do you want to track?

                                                //  var trackcmp = document.createElement("script");
                                                // trackcmp.async = true;
                                                // trackcmp.type = 'text/javascript';
                                                // var eventString = "actid=" + actid
                                                // + "&key=" + eventKey
                                                // + "&event=" + event
                                                // + '&visit=' + encodeURIComponent(JSON.stringify({email: user_data.email}))
                                                // + "&eventdata=" + eventData;

                                                // trackcmp.src = '//trackcmp.net/event?' + eventString;
                                                // var trackcmp_s = document.getElementsByTagName("script");
                                                // var trackcmp_h = document.getElementsByTagName("head");
                                                // trackcmp_h[0].appendChild(trackcmp);

                                                $.ajax({
                                                    //url: location.protocol + '//' + location.host + '/wp-content/plugins/woocom-magic-theo/stripe/charge.php',
                                                    url: location.protocol +
                                                        "//" +
                                                        location.host +
                                                        "/wp-content/themes/seobutler/php/active_campaign/event.php",
                                                    type: "post",
                                                    data: {
                                                        email: user_data.email,
                                                        event: "Purchase",
                                                        event_data: window.location
                                                            .href,
                                                    },
                                                    async: false,
                                                    success: function(d) {
                                                        console.log(d);
                                                    },
                                                });

                                                $(".lds-ring-wrap").removeClass(
                                                    "lds-spec"
                                                );
                                                $(".lds-ring-wrap").removeClass(
                                                    "lds-ring-show"
                                                );
                                                $(
                                                    "#bn-cartinfo-wrap, #bn-ex, #dropin-container, .pwb"
                                                ).hide();
                                                $("#tick").addClass("teckrel");
                                                $(".trigger").toggleClass(
                                                    "drawn"
                                                );

                                                // console.log('order id: ' + order_id);
                                                // console.log('coupon: ' + d.coupon);

                                                /*var script = document.createElement('iframe');
												script.width = 1;
												script.height = 1;
												script.frameBorder = 0;
												script.transaction_id = ''; //Optional
												script.amount = th_payment_amount;
												script.src = "https://www.seobutleraff.com/?nid=378&oid=2&adv1="+order_id+"&coupon_code="+d.coupon;
												if (script.amount > 0) {
													script.src += "&amount=" + script.amount;
												}
												document.getElementsByTagName('body')[0].appendChild(script);*/

                                                var script =
                                                    document.createElement(
                                                        "iframe"
                                                    );
                                                script.width = 1;
                                                script.height = 1;
                                                script.frameBorder = 0;
                                                script.transaction_id =
                                                    order_id; //Optional
                                                script.amount =
                                                    th_payment_amount;
                                                /*script.src = "https://www.seobutleraff.com/?nid=378&event_id=5&oid=2&transaction_id=" + order_id + "&amount=" + script.amount + "&adv1="+order_id+"&coupon_code="+d.coupon;
                                                 */
                                                script.src =
                                                    "https://www.seobutleraff.com/?nid=378&oid=9&amount=" +
                                                    script.amount +
                                                    "&adv1=" +
                                                    order_id +
                                                    "&coupon_code=" +
                                                    d.coupon;

                                                /*if (script.amount > 0) {
													script.src += "&amount=" + script.amount;
												}*/
                                                document
                                                    .getElementsByTagName(
                                                        "body"
                                                    )[0]
                                                    .appendChild(script);

                                                /*<noscript><img src="https://www.seobutleraff.com/?nid=378&oid=2&transaction_id=TRANSACTION_ID&amount=AMOUNT" height="1" width="1" style="display:none;" /></noscript>*/
                                            },
                                        });
                                    } else {
                                        // Decide if you will force the user to enter a different
                                        // payment method if liablity was not shifted
                                        $(".brain-err").text(
                                            "Please use a different card"
                                        );
                                        $(".brain-err").show();
                                        instance.clearSelectedPaymentMethod();
                                        $(".lds-ring-wrap").removeClass(
                                            "lds-spec"
                                        );
                                    }
                                }
                            });
                        });
                    }
                );
            }, //ajax success end
        }); //ajax function end
    }

    function checkoutModal() {
        $(".lds-ring-wrap").addClass("lds-ring-show");
        $("#modal-checkout-wrap")
            .addClass("mcw-active")
            .stop()
            .fadeTo("fast", 1);

        //load paypal
        /*loadPayPal();
		loadStripe();*/
        loadBraintree("firstload");

        //when both are loaded hide the loader
        //$('.lds-ring-wrap').removeClass('lds-ring-show');
    }

    /*****

	HAMBURGER 
	  MOBILE 
	FUNCTIONS

	*****/

    /*$('.hamburger').click(function () {
		$(this).toggleClass('is-active');
		$('.menu-header-menu-container').toggleClass('active-mob-menu');
	});*/

    filtering = false;

    $(".mcfw").click(function() {
        if (!filtering) {
            $(".filtersbutton").hide();
            $(".mcafw").addClass("showmc");
            $(".showhidefilters").show();
            filtering = true;
        }
    });

    $(".mcf").click(function() {
        if ($(this).hasClass("extra")) {
            $(".mcf").removeClass("active");
        } else {
            $(".mcf, .niche, .tld").removeClass("active");
        }

        if ($(this).attr("data") == "niche") {
            $(".niches_select").addClass("showmc");
            $(".sfdimmer").show();
        }

        if ($(this).attr("data") == "tld") {
            $(".country_select").addClass("showmc");
            $(".sfdimmer").show();
        }

        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            return false;
        }

        if ($(this).hasClass("cheapest")) {
            oTable.column("8").order("asc").draw();
            $("tbody")[0].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
        if ($(this).hasClass("highrated")) {
            oTable.column("2").order("desc").draw();
            $("tbody")[0].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
        if ($(this).hasClass("highda")) {
            oTable.column("4").order("desc").draw();
            $("tbody")[0].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });

    $(".niche").click(function() {
        $(".niche, .country").removeClass("active");
        $(this).addClass("active");
        $(".niches_select").removeClass("showmc");
        $(".sfdimmer").hide();
    });

    $(".tld").click(function() {
        $(".niche, .tld").removeClass("active");
        $(this).addClass("active");

        $(".country_select").removeClass("showmc");
        $(".sfdimmer").hide();
    });

    $(".mcsrch").click(function() {
        $(".mcsiw").addClass("showmc");
    });

    $(".mcsrchexit").click(function() {
        $(".mcsiw").removeClass("showmc");
    });

    /*****

	TESTIMONIAL
	SLIDER

	*****/

    if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|Opera Mobi/i.test(
            navigator.userAgent
        )
    ) {
        $("#testimonial-slide-window").css("overflow-x", "scroll");
    }

    $("#testimonial-slide-window").on("touchmove", function() {
        //get the current position
        scrollPos = $(this).scrollLeft();

        $(".testimonial-slide").each(function() {
            //get left bound
            leftBound = $(this).offset().left;
            //alert(scrollPos + " " + leftBound);

            if (scrollPos >= leftBound) {
                visibleTest = $(this).index();
                $("#testimonial-dots span").removeClass("active");
                $("#testimonial-dots span").eq(visibleTest).addClass("active");
            }
        });
    });

    $(document).on("click", "#testimonial-dots span", function() {
        //get current dot index
        dot_position = $(this).index();

        //get the size of the testomoninal window
        testominial_window_width = $("#testimonial-slide-window").width();

        //increase current scroll by the width
        scroll_by = testominial_window_width * dot_position;

        //set target to new active dot
        $("#testimonial-dots span.active").removeClass("active");
        $(this).addClass("active");

        //scroll to testimonial
        $("#testimonial-slide-window")
            .stop()
            .animate({ scrollLeft: scroll_by }, 600);
    });

    //generate dots based on number of testimonials
    $(".testimonial-slide").each(function() {
        $("#testimonial-dots").append("<span></span>");
    });

    //make the first dot the active one on load
    $("#testimonial-dots span:first-child").addClass("active");

    $(".chevron.right").click(function() {
        //get the intended target index
        next_slide_index = $("#testimonial-dots span.active")
            .next("span")
            .index();

        //get the size of the testomoninal window
        testominial_window_width = $("#testimonial-slide-window").width();

        //increase current scroll by the width
        scroll_by = testominial_window_width * next_slide_index;

        //if there is indeed a next slide
        if ($("#testimonial-dots span.active").next("span").length > 0) {
            $("#testimonial-dots span.active")
                .removeClass("active")
                .next("span")
                .addClass("active");
            $("#testimonial-slide-window")
                .stop()
                .animate({ scrollLeft: scroll_by }, 600);
        }

        //else there is no next testiminal
        else {
            $("#testimonial-dots span").removeClass("active");
            $("#testimonial-dots span:first-child").addClass("active");
            $("#testimonial-slide-window")
                .stop()
                .animate({ scrollLeft: 0 }, 600);
        }

        //do the dots
        //if ($('#testimonial-dots span.active').next())
    });

    $(".chevron.left").click(function() {
        //get the intended target index
        next_slide_index = $("#testimonial-dots span.active")
            .prev("span")
            .index();

        //get the size of the testomoninal window
        testominial_window_width = $("#testimonial-slide-window").width();

        //increase current scroll by the width
        scroll_by = -testominial_window_width * next_slide_index;

        //if there is indeed a prev slide
        if ($("#testimonial-dots span.active").prev("span").length > 0) {
            $("#testimonial-slide-window")
                .stop()
                .animate({ scrollLeft: -scroll_by }, 600);
            $("#testimonial-dots span.active")
                .removeClass("active")
                .prev("span")
                .addClass("active");
        }

        //else there is no prev testimonial
        else {
            //get the number of slides
            num_of_slides = $(".testimonial-slide").length;

            //calculate max slide amount
            max_slide = testominial_window_width * num_of_slides;

            $("#testimonial-dots span").removeClass("active");
            $("#testimonial-dots span:last-child").addClass("active");
            $("#testimonial-slide-window")
                .stop()
                .animate({ scrollLeft: max_slide }, 600);
        }
    });

    /* FILTERS */

    (function() {
        var fbMain = $(".filter-block");
        var fbBlocks = $(".filter-blocks");
        var fNb = $(".filter-nb");
        var fAdd = $(".filter-add");
        var popup;

        fAdd.click(function() {
            openPopup();
        });

        function addFilter(name, values) {
            var fld = getFieldData(name);
            var type = fld.type;
            var filt = $("<div>").addClass("filter-filter-item");
            filt.attr("data-type", type);
            filt.attr("data-name", name);
            var str = fld.title;
            if (type == "range") {
                if (isNaN(parseInt(values.from)) && isNaN(parseInt(values.to)))
                    return;
                if (isNaN(parseInt(values.from))) str += "(<" + values.to + ")";
                else if (isNaN(parseInt(values.to)))
                    str += "(>" + values.from + ")";
                else str += "(" + values.from + " - " + values.to + ")";
                filt.attr("data-from", values.from || "");
                filt.attr("data-to", values.to || "");
            }
            if (type == "select") {
                str += "(" + values.value + ")";
                filt.attr("data-value", values.value || "");
            }
            if (type == "text") {
                str += "(" + values.value + ")";
                filt.attr("data-value", values.value || "");
            }
            var span = $("<span>")
                .addClass("filter-filter-item-itm")
                .html(str)
                .click(function() {
                    openPopup(filt[0]);
                });
            var spanDel = $("<span>")
                .addClass("filter-filter-item-remove")
                .click(function() {
                    removeFilter(filt);
                });
            filt.append(span);
            filt.append(spanDel);
            fbBlocks.append(filt);
            checkFilterStatus();
            return filt;
        }

        function removeFilter(div) {
            $(div).remove();
            checkFilterStatus();
        }

        function showField(name, values, div) {
            if (!values) values = {};
            var oldF = popup.find(".popup-field-options");
            oldF.remove();

            var field = $("<div>")
                .addClass("popup-field-options")
                .addClass("filter-popup-field");
            var fld = getFieldData(name);

            if (fld.type == "range") {
                field
                    .append("<p>Value From - To</p>")
                    .append(
                        '<div class="filter-field-range"><input class="filter-field-range-from" value="' +
                        (values.from || "") +
                        '" type="text"><input value="' +
                        (values.to || "") +
                        '" class="filter-field-range-to" type="text"></div>'
                    );
            }
            if (fld.type == "select") {
                var sel = $("<select>");
                for (var i = 0; i < fld.options.length; i++) {
                    sel.append(
                        "<option " +
                        (fld.options[i] == values.value ? "selected" : "") +
                        ' value="' +
                        fld.options[i] +
                        '">' +
                        fld.options[i] +
                        "</option>"
                    );
                }
                field
                    .append("<p>Select Value</p>")
                    .append(
                        $("<div>").addClass("filter-field-select").append(sel)
                    );
            }
            if (fld.type == "text") {
                field.append("<p>Type Text</p>").append(
                    $("<div>")
                    .addClass("filter-field-text")
                    .append($("<input>").val(values.value || ""))
                );
            }

            var $btn = $("<button>")
                .addClass("filter-ok")
                .html("OK")
                .click(function() {
                    var obj = {};
                    if (fld.type == "range") {
                        obj.from = $(".filter-field-range-from").val();
                        obj.to = $(".filter-field-range-to").val();
                    }
                    if (fld.type == "select") {
                        obj.value = $(".filter-field-select select").val();
                    }
                    if (fld.type == "text") {
                        obj.value = $(".filter-field-text input").val();
                    }
                    if (!div) {
                        addFilter(name, obj);
                    } else {
                        var d = addFilter(name, obj);
                        d.insertBefore(div);
                        $(div).remove();
                    }
                    closePopup();
                });

            field.append($btn);

            popup.append(field);
        }

        function openPopup(div) {
            closePopup();
            var opts = {};

            var $dv = $("<div>").addClass("filter-popup");

            popup = $dv;

            if (div) {
                var type = (opts.type = div.dataset.type);
                var name = div.dataset.name;
                var fd = getFieldData(name);
                if (type == "range") {
                    opts.from = div.dataset.from;
                    opts.to = div.dataset.to;
                }
                if (type == "select") {
                    opts.value = div.dataset.value;
                }
                if (type == "text") {
                    opts.value = div.dataset.value;
                }
                showField(name, opts, div);
            } else {
                div = fAdd;
                $dv.append(createColumnSelect());
            }
            var pos = { x: 0, y: 0 };
            var dpos = $(div).offset();
            pos.x = dpos.left;
            pos.y = dpos.top;

            $dv.css({
                left: pos.x + $(div).width() / 2,
                top: pos.y + $(div).height() + 5,
            });

            requestAnimationFrame(function() {
                window.addEventListener("click", _closePopup, false);
            });

            $(document.body).append($dv);
        }

        function _closePopup(e) {
            var $t = $(e.target);
            if ($t.closest(".filter-popup").length) return;
            closePopup();
        }

        function closePopup() {
            if (popup) $(popup).remove();
            popup = null;
            window.removeEventListener("click", _closePopup, false);
        }

        function createColumnSelect(val) {
            var colChoose = $("<select>");
            colChoose.append(
                $("<option>")
                .html("-- select --")
                .attr("disabled", "true")
                .attr("selected", "true")
            );
            for (var i = 0; i < fdata.length; i++) {
                colChoose.append(
                    "<option " +
                    (fdata[i].name == val ? "selected" : "") +
                    ' value="' +
                    fdata[i].name +
                    '">' +
                    fdata[i].title +
                    "</option>"
                );
            }
            colChoose.change(function() {
                showField(this.value);
            });
            return $("<div>")
                .addClass("filter-popup-field")
                .append("<p>Choose Column</p>")
                .append(colChoose);
        }

        function getFieldData(name) {
            for (var i = 0; i < fdata.length; i++) {
                if (fdata[i].name == name) return fdata[i];
            }
        }

        function checkFilterStatus() {
            if (fbBlocks[0].children.length) fbMain.addClass("has-filters");
            else fbMain.removeClass("has-filters");

            filtercallback();
        }
    })();

    var $tlds = $(".country_select .tld");
    var tlds = [];
    $tlds.each(function() {
        tlds.push(this.getAttribute("data"));
    });

    var fdata = [{
            name: "sc",
            title: "Site Category",
            type: "text",
        },
        {
            name: "st",
            title: "Site Rating",
            type: "range",
        },
        {
            name: "tld",
            title: "TLD",
            type: "select",
            options: tlds,
        },
        {
            name: "da",
            title: "DA",
            type: "range",
        },
        {
            name: "dr",
            title: "DR",
            type: "range",
        },
        {
            name: "rd",
            title: "RD",
            type: "range",
        },
        {
            name: "ot",
            title: "Organic Traffic",
            type: "range",
        },
        {
            name: "price",
            title: "Price",
            type: "range",
        },
    ];

    function filtercallback() {
        setTimeout(function() {
            oTable.draw();
        }, 30);
    }

    //var $tlinks = $('.gp-links-table');
    //$tlionks.each(function(){
    //
    //});

    /* Money Back Popup */
    (function() {
        var $btn = $(".money-back-guarantee");
        var $mbp = $(".money-back-guarantee-popup");
        var $close = $(".popup-close, .popup-dark");
        var $bdy = $("html,body");

        $close.click(function() {
            $mbp.removeClass("show");
            setTimeout(function() {
                $mbp.addClass("hidden");
                $bdy.css({ overflow: "" });
            }, 500);
        });
        $btn.click(function() {
            $mbp.removeClass("hidden");
            $bdy.css({ overflow: "hidden" });
            setTimeout(function() {
                $mbp.addClass("show");
            }, 100);
        });
    })();
    /********************/
});

jQuery(function($) {
    // Get all data (field name is key, field value is value)
    function sb_product_data() {
        console.log(links_selected);
        var sb_product_data = {};
        var sb_valid_fields = true;
        var site_ids = [];
        var sites_data = [];

        $(".row-selected-fp").each(function() {
            var current_product = $(this);
            var product_id = current_product.find(".sb-product-id").val();
            var product_data = current_product.find(".liw input");
            var product_data_arr = {};

            product_data.each(function() {
                var element = $(this);
                var name = element.attr("name");
                var value = element.val();
                value = value ? value : "";

                if (element.hasClass("sb-product-data-required-field")) {
                    if (!value) {
                        element.addClass("field-error");
                        sb_valid_fields = false;
                    } else {
                        element.removeClass("field-error");
                    }
                }
                product_data_arr[name] = value;
            });
            site_ids.push(product_id);
            sites_data.push(product_data_arr);
        });

        if (sb_valid_fields) {
            const clearLinks = links_selected.links.filter(n => n);
            sb_product_data["site_ids"] = links_selected.site_ids;
            sb_product_data["links"] = clearLinks;
            sb_product_data["product_id"] = 967;
            sb_product_data["quantity"] = 1;
            sb_product_data["product"] = "GP";
            // Displayed below the product name
            sb_product_data["description"] = "Excellent choice!";
            var total = $("#selected-price span").text();
            total = total.replace("$", "");
            // gtag_report_conversion("", total);
            links_selected.site_ids = [];
            links_selected.links = [];
            return sb_product_data;
        } else {
            return false;
        }
    }

    // Add to cart
    $("body").on("click", ".sb-add-to-cart-product", function(e) {
        e.preventDefault();
        // Get data
        var sb_data = sb_product_data();

        if (sb_data) {
            // Add to cart
            sb_add_to_cart(sb_data);
        }
    });

    var sb_add_to_cart_request = false;
    // Add to cart
    function sb_add_to_cart(product_data) {
        if (sb_add_to_cart_request === true) {
            return false;
        }



        sb_add_to_cart_request = true;

        $.ajax({
            url: sb_data.sb_ajax,
            type: "post",
            dataType: "json",
            data: {
                action: "sb_add_to_cart_content_product",
                array_data: product_data,
            },
            success: function(result) {
                // Restore field values


                var total = $("#selected-price span").text();
                $('.row-selected-fp input.sb-product-data-field:not([name="site_id"])').val();
                $('.row-selected-fp input[type="checkbox"]').prop("checked", 0);
                $(".row-selected-fp .liw").remove();
                $(".row-selected-fp").removeClass("row-selected-fp");
                $("#selected-price span, .tot .mnl").text("$0");
                $(".lnks .mnl").text("0");
                sb_add_to_cart_request = false;
                sb_show_add_to_cart_notice();
                // gtag_report_conversion("", total);
                $(document.body).trigger("wc_fragment_refresh");
            },

            // An error notification will be added later
            error: function() {
                $(document.body).trigger("wc_fragment_refresh");
                // Restore field values
                $(
                    '.row-selected-fp input.sb-product-data-field:not([name="site_id"])'
                ).val();
                $('.row-selected-fp input[type="checkbox"]').prop("checked", 0);
                $(".row-selected-fp .liw").remove();
                $(".row-selected-fp").removeClass("row-selected-fp");
                $("#selected-price span, .tot .mnl").text("$0");
                $(".lnks .mnl").text("0");
                sb_add_to_cart_request = false;
                sb_show_add_to_cart_notice();
            },
        });
    }

    var sb_add_to_cart_notice_timeout;

    function sb_show_add_to_cart_notice() {
        var notice_wrapper = $(".sb-add-to-cart-notice-wrapper");
        clearTimeout(sb_add_to_cart_notice_timeout);
        notice_wrapper.fadeIn(300);
        sb_add_to_cart_notice_timeout = setTimeout(function() {
            notice_wrapper.fadeOut(300);
        }, 5000);
    }

    $("body").on("click", ".sb-add-to-cart-notice-wrapper", function() {
        $(this).fadeOut(300);
    });
});