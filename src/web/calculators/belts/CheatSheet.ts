import Measurement from "common/models/Measurement";
import { teethToPD } from "web/calculators/belts/math";
const WCP_HTD = "https://www.wcproducts.com/belts-chain-gears/belts-pulleys/htd-timing-pulleys-896";
const WCP_GT2 = "https://www.wcproducts.com/belts-chain-gears/belts-pulleys/gt2-timing-pulleys";
const WCP_HTD_VERSA = "https://www.wcproducts.com/belts-chain-gears/belts-pulleys/htd-versa-pulleys-896";
const VEX_HTD = "https://www.vexrobotics.com/htdpulleys.html";
const VEX_GT2 = "https://www.vexrobotics.com/gt2pulleys.html";
const VEX_HTD_VERSA = "https://www.vexrobotics.com/htdversapulley.html";
export default function CheatSheet() {
    const Pulley = (vendors: any, type: any, pitch: any, width: any, teeth: any, bore: any) => {
        return {
            vendors,
            type,
            pitch,
            width,
            teeth,
            bore,
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"in"' is not assignable to param... Remove this comment to see the full error message
            pd: teethToPD(teeth, new Measurement(pitch, "mm"), "in"),
        };
    };
    const Vendor = (name: any, url = null) => {
        return { name, url };
    };
    const data = [
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.vexrobotics.com/gt2... Remove this comment to see the full error message
        Pulley([Vendor("VEXpro", VEX_GT2)], "GT2", 3, 9, 12, "RS550"),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.vexrobotics.com/gt2... Remove this comment to see the full error message
        Pulley([Vendor("VEXpro", VEX_GT2), Vendor("WCP", WCP_GT2)], "GT2", 3, 9, 12, "RS775"),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.vexrobotics.com/gt2... Remove this comment to see the full error message
        Pulley([Vendor("VEXpro", VEX_GT2), Vendor("WCP", WCP_GT2)], "GT2", 3, 9, 12, "BAG"),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.vexrobotics.com/gt2... Remove this comment to see the full error message
        Pulley([Vendor("VEXpro", VEX_GT2), Vendor("WCP", WCP_GT2)], "GT2", 3, 9, 16, "Falcon"),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.vexrobotics.com/gt2... Remove this comment to see the full error message
        Pulley([Vendor("VEXpro", VEX_GT2), Vendor("WCP", WCP_GT2)], "GT2", 3, 9, 24, '1/2" Hex'),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.vexrobotics.com/gt2... Remove this comment to see the full error message
        Pulley([Vendor("VEXpro", VEX_GT2), Vendor("WCP", WCP_GT2)], "GT2", 3, 9, 36, '1/2" Hex'),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.vexrobotics.com/gt2... Remove this comment to see the full error message
        Pulley([Vendor("VEXpro", VEX_GT2), Vendor("WCP", WCP_GT2)], "GT2", 3, 9, 48, '1/2" Hex'),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.vexrobotics.com/gt2... Remove this comment to see the full error message
        Pulley([Vendor("VEXpro", VEX_GT2), Vendor("WCP", WCP_GT2)], "GT2", 3, 9, 60, '1/2" Hex'),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.vexrobotics.com/htd... Remove this comment to see the full error message
        Pulley([Vendor("VEXpro", VEX_HTD), Vendor("WCP", WCP_HTD)], "HTD", 5, "9, 15", 18, '1/2" Hex'),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.vexrobotics.com/htd... Remove this comment to see the full error message
        Pulley([Vendor("VEXpro", VEX_HTD), Vendor("WCP", WCP_HTD)], "HTD", 5, "9, 15", 24, '1/2" Hex'),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.vexrobotics.com/htd... Remove this comment to see the full error message
        Pulley([Vendor("VEXpro", VEX_HTD), Vendor("WCP", WCP_HTD)], "HTD", 5, "9, 15", 30, '1/2" Hex'),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.vexrobotics.com/htd... Remove this comment to see the full error message
        Pulley([Vendor("VEXpro", VEX_HTD), Vendor("WCP", WCP_HTD)], "HTD", 5, "9, 15", 36, '1/2" Hex'),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.vexrobotics.com/htd... Remove this comment to see the full error message
        Pulley([Vendor("VEXpro", VEX_HTD_VERSA), Vendor("WCP", WCP_HTD_VERSA)], "HTD", 5, "7, 18", 42, "VersaKey"),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.vexrobotics.com/htd... Remove this comment to see the full error message
        Pulley([Vendor("VEXpro", VEX_HTD_VERSA), Vendor("WCP", WCP_HTD_VERSA)], "HTD", 5, "7, 18", 60, "VersaKey"),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.wcproducts.com/belt... Remove this comment to see the full error message
        Pulley([Vendor("WCP", WCP_HTD)], "HTD", 5, "9, 15", 12, "NEO/CIM (8mm)"),
        Pulley([
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.andymark.com/produc... Remove this comment to see the full error message
            Vendor("AndyMark", "https://www.andymark.com/products/12-tooth-5mm-htd-cim-bore-pulley-with-flanges"),
        ], "HTD", 5, 9, 12, "NEO/CIM (8mm)"),
        Pulley([
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.andymark.com/produc... Remove this comment to see the full error message
            Vendor("AndyMark", "https://www.andymark.com/products/24t-htd-pulley-1-2-in-hex-bore"),
        ], "HTD", 5, 9, 24, '1/2" Hex'),
        Pulley([Vendor("AndyMark")], "HTD", 5, 9, 24, '3/8" Hex'),
        Pulley([
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.andymark.com/produc... Remove this comment to see the full error message
            Vendor("AndyMark", "https://www.andymark.com/products/24t-htd-pulley-6mm-bore"),
        ], "HTD", 5, 9, 24, "6mm"),
        Pulley([
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.andymark.com/produc... Remove this comment to see the full error message
            Vendor("AndyMark", "https://www.andymark.com/products/30-tooth-htd-pulley"),
        ], "HTD", 5, 9, 30, "NEO/CIM (8mm)"),
        Pulley([
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.andymark.com/produc... Remove this comment to see the full error message
            Vendor("AndyMark", "https://www.andymark.com/products/39-tooth-htd-plastic-drive-pulley-kit-with-hex-hub"),
        ], "HTD", 5, 15, 39, '1/2" Hex'),
        Pulley([
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.andymark.com/produc... Remove this comment to see the full error message
            Vendor("AndyMark", "https://www.andymark.com/products/39-tooth-htd-plastic-drive-pulley-kit"),
        ], "HTD", 5, 15, 39, '1/2" Round'),
        Pulley([
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.andymark.com/produc... Remove this comment to see the full error message
            Vendor("AndyMark", "https://www.andymark.com/products/42-tooth-htd-pulley"),
        ], "HTD", 5, 15, 42, '0.95"'),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.revrobotics.com/neo... Remove this comment to see the full error message
        Pulley([Vendor("REV", "https://www.revrobotics.com/neo-pinions/")], "GT2", 3, 21.4, 16, "NEO/CIM (8mm)"),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.revrobotics.com/550... Remove this comment to see the full error message
        Pulley([Vendor("REV", "https://www.revrobotics.com/550-motor-pinions/")], "GT2", 3, 11.9, 12, "RS550"),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.revrobotics.com/rev... Remove this comment to see the full error message
        Pulley([Vendor("REV", "https://www.revrobotics.com/rev-41-1668/")], "GT2", 3, 15, 12, "5mm Hex"),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.revrobotics.com/rev... Remove this comment to see the full error message
        Pulley([Vendor("REV", "https://www.revrobotics.com/rev-45-1823/")], "GT2", 3, 5, 24, "5mm Hex, 16mm Bolt Circle"),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.revrobotics.com/rev... Remove this comment to see the full error message
        Pulley([Vendor("REV", "https://www.revrobotics.com/rev-45-1823/")], "GT2", 3, 5, 30, "5mm Hex, 16mm Bolt Circle"),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.revrobotics.com/rev... Remove this comment to see the full error message
        Pulley([Vendor("REV", "https://www.revrobotics.com/rev-45-1823/")], "GT2", 3, 5, 36, "5mm Hex, 16mm Bolt Circle"),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.revrobotics.com/rev... Remove this comment to see the full error message
        Pulley([Vendor("REV", "https://www.revrobotics.com/rev-45-1823/")], "GT2", 3, 5, 48, "5mm Hex, 16mm Bolt Circle"),
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"https://www.revrobotics.com/rev... Remove this comment to see the full error message
        Pulley([Vendor("REV", "https://www.revrobotics.com/rev-45-1823/")], "GT2", 3, 5, 60, "5mm Hex, 16mm Bolt Circle"),
    ];
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'table'.
    return (<table>className) = "table is-hoverable is-narrow" >
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'thead'.
        <thead><tr><th>Vendor < /th>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
        < th > Type < /th>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
        < th > Pitch < /th>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
        < th > Width < /th>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
        < th > Teeth < /th>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
        < th > Bore < /th>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'th'.
        < th >
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'abbr'.
        <abbr>title;
    // @ts-expect-error ts-migrate(2365) FIXME: Operator '<' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
    "Pitch Diameter" > PD < /abbr>
        < /th>
        < /tr>
        < /thead>
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tbody'.
        < tbody >
        { data, : .map((pulley: any) => {
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tr'.
                return (<tr>key) = {
                    pulley, : .vendors[0].name +
                        pulley.teeth +
                        pulley.bore +
                        pulley.type
                }
                    >
                        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
                        <td>{ pulley, : .vendors
                                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'a'.
                                .map((v: any) => <a>key, { v, : .name }, href = { v, : .url } >
                                // @ts-expect-error ts-migrate(18004) FIXME: No value exists in scope for the shorthand propert... Remove this comment to see the full error message
                                { v, : .name }
                                // @ts-expect-error ts-migrate(2365) FIXME: Operator '>' cannot be applied to types 'boolean' ... Remove this comment to see the full error message
                                < (/a>) as any).reduce((prev: any, curr: any) => [prev, ", ", curr])) }
                    < /td>
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
                    < td > { pulley, : .type } < /td>
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
                    < td > { pulley, : .pitch };
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
                mm < /td>
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
                    < td > { pulley, : .width };
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'mm'.
                mm < /td>
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
                    < td > { pulley, : .teeth };
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'T'.
                T < /td>
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
                    < td > { pulley, : .bore } < /td>
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'td'.
                    < td > { pulley, : .pd.scalar.toFixed(3) } & quot;
                <>/td>
                    < /tr>;
            })
        };
}
<>/tbody>
    < /table>;
;
