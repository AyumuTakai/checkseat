<script lang="ts">
    import Sheat from "./Sheat.svelte";

    const activeColor = "red";
    const nonActiveColor = "white";

    const onClickHndler = (e: Event) => {
        const el = e.target as SVGEllipseElement;
        if (el.style.fill == activeColor) {
            el.style.fill = nonActiveColor;
        } else {
            el.style.fill = activeColor;
        }
    };
</script>

<div>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="1121px"
        height="601px"
        viewBox="-0.5 -0.5 1121 601"
        style="background-color: rgb(255, 255, 255);"
        ><defs /><g
            ><rect
                x="70"
                y="440"
                width="350"
                height="60"
                fill="rgb(255, 255, 255)"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="0"
                y="354"
                width="420"
                height="60"
                fill="rgb(255, 255, 255)"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="0"
                y="260"
                width="420"
                height="60"
                fill="rgb(255, 255, 255)"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="70"
                y="170"
                width="350"
                height="60"
                fill="rgb(255, 255, 255)"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="70"
                y="80"
                width="350"
                height="60"
                fill="rgb(255, 255, 255)"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="70"
                y="0"
                width="350"
                height="60"
                fill="rgb(255, 255, 255)"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="450"
                y="440"
                width="420"
                height="60"
                fill="rgb(255, 255, 255)"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="450"
                y="354"
                width="420"
                height="60"
                fill="rgb(255, 255, 255)"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="450"
                y="174"
                width="420"
                height="60"
                fill="rgb(255, 255, 255)"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="450"
                y="260"
                width="420"
                height="60"
                fill="rgb(255, 255, 255)"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="450"
                y="0"
                width="420"
                height="60"
                fill="rgb(255, 255, 255)"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="450"
                y="86"
                width="420"
                height="60"
                fill="rgb(255, 255, 255)"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            />
            <rect
                x="900"
                y="440"
                width="220"
                height="60"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="900"
                y="354"
                width="220"
                height="60"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="900"
                y="260"
                width="220"
                height="60"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="900"
                y="174"
                width="220"
                height="60"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="900"
                y="86"
                width="220"
                height="60"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="900"
                y="0"
                width="220"
                height="60"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            /><rect
                x="480"
                y="540"
                width="220"
                height="60"
                stroke="rgb(0, 0, 0)"
                pointer-events="all"
            />
            <Sheat cx={110} cy={384} no={1} />
            <Sheat cx={360} cy={384} no={2} />
            <Sheat cx={580} cy={384} no={3} />
            <Sheat cx={820} cy={384} no={4} />
            <Sheat cx={110} cy={290} no={5} />
            <Sheat cx={360} cy={290} no={6} />
            <Sheat cx={580} cy={290} no={7} />
            <Sheat cx={820} cy={290} no={8} />
            <Sheat cx={110} cy={200} no={9} />
            <Sheat cx={360} cy={200} no={10} />
            <Sheat cx={580} cy={200} no={11} />
            <Sheat cx={820} cy={200} no={12} />
            <Sheat cx={580} cy={120} no={13} />
            <Sheat cx={820} cy={120} no={14} />

            <Sheat cx={110} cy={30}  no={40} />
            <g transform="translate(-0.5 -0.5)"
                ><switch
                    ><foreignObject
                        pointer-events="none"
                        width="100%"
                        height="100%"
                        requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
                        style="overflow: visible; text-align: left;"
                        ><div
                            style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 218px; height: 1px; padding-top: 570px; margin-left: 481px;"
                        >
                            <div
                                data-drawio-colors="color: rgb(0, 0, 0); "
                                style="box-sizing: border-box; font-size: 0px; text-align: center;"
                            >
                                <div
                                    style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: normal; overflow-wrap: normal;"
                                >
                                    教卓
                                </div>
                            </div>
                        </div></foreignObject
                    ><text
                        x="590"
                        y="574"
                        fill="rgb(0, 0, 0)"
                        font-family="Helvetica"
                        font-size="12px"
                        text-anchor="middle">教卓</text
                    ></switch
                ></g
            ></g
        ></svg
    >
</div>

<style>
    svg {
        width: 100%;
    }
    svg rect {
        fill: white;
    }
    svg ellipse {
        fill: white;
    }
    svg ellipse#active {
        fill: red;
    }
</style>
