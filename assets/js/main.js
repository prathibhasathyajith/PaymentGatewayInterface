$(document).ready(function () {
    $("#master_ca").hide();
    $("#visa_ca").hide();
    $("#amex_ca").hide();
    new Cleave('.input-cardField', {
        creditCard: true,
        onCreditCardTypeChanged: function (type) {
            if (type == 'visa') {
                $("#master_ca").hide();
                $("#amex_ca").hide();
                $("#visa_ca").show();
                $(".caImage").css('background','transparent');
            } else if (type == 'amex') {
                $("#master_ca").hide();
                $("#visa_ca").hide();
                $("#amex_ca").show();
                $(".caImage").css('background','#0A7EC2');
            } else if (type == 'mastercard') {
                $("#visa_ca").hide();
                $("#amex_ca").hide();
                $("#master_ca").show();
                $(".caImage").css('background','transparent');
            } else {
                $("#master_ca").hide();
                $("#visa_ca").hide();
                $("#amex_ca").hide();
                $(".caImage").css('background','transparent');
            }
        }
    });
    //title-info font color
    $(".PGI > .box > .content > .title-info").css('color', invertColor(color, true));
    // name color
    $(".PGI > .box > .content > .merchant > .name").css('color', ColorLuminance(color, -0.6));
    //amount color
    $(".PGI > .box > .content > .amount > .label > .cont").css('color', invertColor(color, true));
    $(".PGI > .box > .content > .amount > .label > .amnt").css('color', invertColor(color, true));
    // line background color
    $(".PGI > .box > .content > .amount > .label > .line").css('background', invertColor(color, true));

    //message close button
    $(".PGI > .box > .content > .message > .close").click(function () {
        $(".PGI > .box > .content > .message").slideUp(100);
    });




});

function ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }

    return rgb;
}

function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#000000' : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
