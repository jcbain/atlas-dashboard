import { Axes } from "../axes";
import { useResizeObserver } from "../../../../hooks";
import { useRef, useEffect, useState } from "react";
import { min, max } from "lodash";
import * as d3 from "d3";

const margin = 40;
const barSpace = 3;

const PlotBars = ({ chartData, selection, setSelection }) => {
	const [ref, observedEntry, dimensions] = useResizeObserver();
	const canvasRef = useRef(null);
	const [axes, setAxes] = useState({
		maxX: 0,
		maxY: 0,
		minX: 0,
		minY: 0,
	});

	useEffect(() => {
		if (chartData) {
			const upperX = chartData.map((d) => d.x1);
			const lowerX = chartData.map((d) => d.x0);
			const ys = chartData.map((d) => d.length);

			setAxes((axes) => ({
				...axes,
				maxX: max(upperX),
				minX: min(lowerX),
				maxY: max(ys),
				minY: min(ys),
			}));
		}
	}, [chartData]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		const height = dimensions.height - margin;
		const width = dimensions.width - margin * 2;

		context.clearRect(0, 0, width, height);

		const xScale = d3
			.scaleLinear()
			.domain([axes.minX, axes.maxX])
			.range([0, width]);
		const yScale = d3
			.scaleLinear()
			.domain([axes.maxY, 0])
			.range([0, height]);
		const rectWidth = width / chartData.length - barSpace;

		chartData.forEach((v, i) => {
			context.fillStyle = "rgba(104, 44, 254, 0.5)";
			context.strokeStyle = "#682CFE";

			context.fillRect(
				xScale(v.x0),
				yScale(v.length),
				rectWidth,
				height - yScale(v.length)
			);
			context.strokeRect(
				xScale(v.x0),
				yScale(v.length),
				rectWidth,
				height - yScale(v.length)
			);
		});
	}, [axes, dimensions]);

	return (
		<div ref={ref} style={{ position: "relative", height: "75%" }}>
			<canvas
				ref={canvasRef}
				style={{
					position: "absolute",
					top: `${margin}px`,
					left: `${margin}px`,
				}}
				width={`${dimensions.width - margin * 2}px`}
				height={`${dimensions.height - margin}px`}
			/>
			<Axes
				addBrush={false}
				axes={axes}
				dimensions={dimensions}
				selection={selection}
				setSelection={setSelection}
			/>
		</div>
	);
};

export default PlotBars;
