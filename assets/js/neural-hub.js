/**
 * neural-hub.js
 * Renders an interactive, SVG-based "Neural Hub" visualization of the 
 * AI-102 exam blueprint using the D3.js library.
 *
 * This version uses a fixed viewBox to be resilient to CSS layout timing issues.
 */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof d3 === 'undefined') {
        console.error('D3.js is not loaded. Cannot render the Neural Hub.');
        return;
    }
    const container = document.getElementById('neural-hub-container');
    if (!container) {
        return; // Silently return if the container is not on the current page
    }

    // --- 1. Data Definition ---
    const examData = [
        { name: 'NLP Solutions', percent: 32.5, color: '#8f00ff' },
        { name: 'Plan & Manage Azure AI Solutions', percent: 17.5, color: '#ff2c2c' },
        { name: 'Implement Generative AI', percent: 17.5, color: '#00ffff' },
        { name: 'Implement Computer Vision', percent: 12.5, color: '#eaff00' },
        { name: 'Knowledge Mining & Document Intelligence', percent: 12.5, color: '#ff6600' },
        { name: 'Implement Agentic Solutions', percent: 7.5, color: '#39ff14' },
    ];

    // --- 2. SVG Setup (Robust Version) ---
    const viewBoxSize = 500; // Use a fixed internal coordinate system
    const svg = d3.select(container)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('preserveAspectRatio', 'xMidYMid meet') // Ensures proper scaling
        .attr('viewBox', `0 0 ${viewBoxSize} ${viewBoxSize}`) // Use the fixed size
        .style('overflow', 'visible');

    // Group to hold the entire hub, allowing for rotation and easy centering.
    const hubGroup = svg.append('g')
        .attr('id', 'hub-group')
        // We now transform the group to the center of our fixed viewBox
        .attr('transform', `translate(${viewBoxSize / 2}, ${viewBoxSize / 2})`);

    const center = { x: 0, y: 0 }; // The group's origin is the new center

    // --- 3. Scales & Layout ---
    const radiusScale = d3.scaleSqrt().domain([0, 32.5]).range([20, 60]); // Slightly larger radii
    const orbitRadius = viewBoxSize / 3.2; // Radius based on fixed viewBox

    const nodes = [
        { ...examData[0], x: center.x, y: center.y, r: radiusScale(examData[0].percent) },
        ...examData.slice(1).map((node, i) => {
            const angle = (i / (examData.length - 1)) * 2 * Math.PI;
            return {
                ...node,
                x: center.x + orbitRadius * Math.cos(angle),
                y: center.y + orbitRadius * Math.sin(angle),
                r: radiusScale(node.percent)
            };
        })
    ];

    const links = examData.slice(1).map((_, i) => ({
        source: nodes[i + 1],
        target: nodes[0]
    }));

    // --- 4. Render Elements ---
    hubGroup.selectAll('line')
        .data(links)
        .enter()
        .append('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
        .attr('stroke', '#444')
        .attr('stroke-width', 2);

    const nodeGroups = hubGroup.selectAll('g.node')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.x}, ${d.y})`);

    nodeGroups.append('circle')
        .attr('r', d => d.r)
        .attr('fill', d => d.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('filter', d => `drop-shadow(0 0 10px ${d.color})`)
        .style('animation', d => `pulse ${2 + (35 - d.percent) * 0.1}s infinite`);

    nodeGroups.append('text')
        .text(d => `${d.percent}%`)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.3em')
        .attr('fill', '#0a0a0a')
        .attr('font-size', d => `${Math.max(12, d.r / 2.5)}px`)
        .attr('font-weight', 'bold')
        .style('pointer-events', 'none');

    // --- 5. Tooltip & Interaction ---
    const tooltip = d3.select('body').append('div')
        .attr('class', 'neural-tooltip')
        .style('opacity', 0);

    nodeGroups
        .on('mouseover', function(event, d) {
            d3.select('#hub-group').style('animation-play-state', 'paused');
            d3.select(this).select('circle').transition().duration(200).attr('transform', 'scale(1.1)');
            tooltip.transition().duration(200).style('opacity', .9);
            tooltip.html(d.name)
                .style('left', (event.pageX + 15) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function() {
            d3.select('#hub-group').style('animation-play-state', 'running');
            d3.select(this).select('circle').transition().duration(200).attr('transform', 'scale(1)');
            tooltip.transition().duration(500).style('opacity', 0);
        });
});
