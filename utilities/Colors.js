/**
 * This color pallete roughly follows the material design pallete template.
 * Each color in the pallete comes with a corresponding 'contrast' color which
 * should be either white or black (or a slight variant), whichever has the
 * best contrast.
 * 
 * By naming the colors to correspond with their function rather than their
 * actual color, we decouple design from function and allow for alternative
 * color palletes to easily be designed. For instance, a dark color pallete
 * that defines the colors below should look equally good.
 * 
 * As a rule of thumb, background and surface colors should be similar, but
 * distinguishable. For instance, a common configuration is for the background
 * to be light grey and the surface to be white.
 * 
 * The primary and secondary colors should usually be a color other than
 * white, black, or grey, and should have sharp contrast with surface and
 * background colors.
 * 
 * There are five main colors in the pallete:
 * - Primary
 * - Secondary
 * - Background
 * - Surface
 * - Error
 */
export default {
    Primary: '#07163f',
    PrimaryContrast: '#FFFFFF',

    Secondary: '#D02235',
    SecondaryContrast: '#FFFFFF',

    Background: '#EEEEEE',
    BackgroundContrast: '#24272B',

    Surface: '#FFFFFF',
    SurfaceContrast: '#24272B',
    SurfaceContrast2: '#CDCDCD',

    Error: '#D02235',
    ErrorContrast: '#FFFFFF'
}