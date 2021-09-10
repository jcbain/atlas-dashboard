const colors = {
    blacks: {
        black1: '#000000',
        black2: '#303030',
        black3: '#4d4d4d'
    },
    whites: {
        white1: '#ffffff',
        white2: '#fffff7'
    },
    grays: {
        gray1: '#e0e0e0',
        gray2: '#9e9e9e'
    },
    purples: {
        purple1: '#5d0096', 
        purple2: '#9538f2',
        purple3: '#a751fc',
        purple4: '#682CFE',
        purple5: '#fafbff'
    },
    blues: {
        blue1: '#0082e6', 
        blue2: '#026dd9'
    },
    yellows: {
        yellow1: '#ffd000'
    },
    reds: {
        red1: '#eb4034'
    }
}

export const lightTheme = {
    simpleFont: 'Roboto',
    funFont: 'Baloo Tammudu 2',
    serifFont: 'Orelega One',
    smallPaddingH: '20px',
    smallPaddingV: '20px',
    headerHeight: '75px',
    articleMaxWidth: '1024px',
    articleHeaderColor: colors.blues.blue1,
    articleTitleColor: colors.whites.white2,
    articleBodyColor: colors.whites.white1,
    linkColor: colors.blacks.black2,
    navNameColor: colors.blacks.black2,
    navSideOutline: colors.blues.blue2,
    maxGreaterZeroColor: colors.reds.red1,
    minGreaterZeroColor: colors.yellows.yellow1,
    minLessZeroColor: colors.purples.purple1,
    maxLessZeroColor: colors.blues.blue1,
    zeroColor: colors.whites.white1,
    nonFocusColor: colors.grays.gray1,
    lineColor: colors.purples.purple4,
    binColor: hexToRGB(colors.purples.purple4, 0.5),
    binOutline: colors.purples.purple4,
    dropDownArrowColor: colors.blacks.black2,
    dropDownItemsColor: colors.whites.white1,
    dropDownItemsBorder: colors.blacks.black2,
    dropDownHighLightGradient1: colors.purples.purple3,
    dropDownHighLightGradient2: colors.purples.purple2,
    thumbSliderColor: colors.whites.white2,
    thumbSliderOutline: colors.purples.purple4,
    sliderColor: colors.grays.gray1,
    axisTickFill: colors.blacks.black3,
    dashboardBackground: colors.purples.purple5,
    chartCardBackground: colors.whites.white1,
    chartCardOutline: colors.grays.gray1,
    paramBarBackground: colors.whites.white1,
    paramHeaderColor: colors.purples.purple4,
    paramDescriptionColor: colors.grays.gray2,
    paramCardBackground: colors.whites.white1,
    paramCardOutline: colors.purples.purple4,
    tabFontColor: colors.grays.gray2
}

function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}
