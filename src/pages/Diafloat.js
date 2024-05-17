import React, { useEffect, useRef, useState } from 'react'
import paper from 'paper'
import axios from 'axios'
import { Point, Size } from 'paper/dist/paper-core'


function Diafloat({ connectdoc }) {
    const floatref = useRef(null)
    const cfloat = floatref.current;
    // let temarr = []
    // const [isassignid, setassignid] = useState([])
    useEffect(() => {
        // console.log(connectdoc);
        let cfloat = floatref.current;
        if (!cfloat) { return; } // Ensure canvasRef is initialized
        else {
            paper.setup(cfloat);
            if (connectdoc) {
                paper.project.clear();
                var svgGroup = new paper.Group();
                console.log(svgGroup);
                axios.get(connectdoc) // Fetch SVG content from the URL
                    .then(response => {
                        console.log(response);
                        const svgContent = response.data;
                        console.log(svgContent);
                        paper.project.importSVG(svgContent, (importedSVG) => {
                            importedSVG.fitBounds(new paper.Rectangle(new Point(0, 0), new Size(paper.view.size.width, paper.view.size.height)));
                            svgGroup.addChild(importedSVG);
                            console.log(svgGroup);
                            svgGroup.position = paper.view.center;
                            console.log(svgGroup);
                            svgGroup.fitBounds(paper.view.bounds);
                            console.log(svgGroup);
                            paper.view.draw();

                        });
                    })
                    .catch(error => {
                        console.error('Error fetching SVG content:', error);
                    });
            }
        }
    }, [connectdoc])






    // useEffect(() => {
    //     let cfloat = floatref.current;
    //     const ctx = cfloat.getContext('2d');

    //     axios.get(connectdoc)
    //       .then(response => {
    //         const svgContent = response.data;
    //         const img = new Image();
    //         img.onload = () => {
    //           ctx.drawImage(img, 0, 0);
    //         };
    //         img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgContent)));
    //       })
    //       .catch(error => {
    //         console.error('Error fetching SVG content:', error);
    //       });


    //     // paper.setup(cfloat);

    //     // axios.get(connectdoc)
    //     //     .then(response => {
    //     //         const svgContent = response.data;
    //     //         const raster = new paper.Raster({
    //     //             source: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgContent))),
    //     //             onLoad: () => {
    //     //                 raster.position = paper.view.center;
    //     //             }
    //     //         });
    //     //     })
    //     //     .catch(error => {
    //     //         console.error('Error fetching SVG content:', error);
    //     //     });

    //     // return () => {
    //     //     paper.project.clear();
    //     //     paper.view.remove();
    //     // };


    // }, [connectdoc])






    // useEffect(()=>{
    //     floatref.current.addEventListener('click', flagClick);
    // })
    // useEffect(()=>{
    //     console.log( isassignid);
    // },[isassignid])

    // const flagClick=(event)=>{
    //     paper.project.getItems({ selected: true }).forEach(item => {
    //         console.log("enter unselect");
    //         item.selected = false;
    //     });
    //     console.log("enter handle")
    //     const point = new paper.Point(event.clientX - cfloat.getBoundingClientRect().left, event.clientY - cfloat.getBoundingClientRect().top);
    //     console.log("point:", point);
    //     const paperPoint = paper.view.viewToProject(point);
    //     console.log("paperpoint:", paperPoint)
    //     const hitResult = paper.project.hitTest(paperPoint, {
    //         // fill: true,
    //         stroke: true,
    //         segments: true,
    //         tolerance: 5,
    //     });
    //     console.log("hitresult::", hitResult)
    //     console.log(hitResult);

    //     if (hitResult && hitResult.item) {

    //         if (hitResult.item.selected == false) {
    //             hitResult.item.selected = true
    //             console.log(hitResult.item.id);

    //             var resid = hitResult.item.id
    //             console.log(resid);

    //             temarr.push(resid)

    //             console.log(temarr);
    //             setassignid(temarr)
    //             temarr = []
    //         }
    //     }
    // }


    // useEffect(() => {
    //     let cfloat = floatref.current;
    //     paper.setup(cfloat);

    //     axios.get(connectdoc)
    //       .then(response => {
    //         const svgContent = response.data;

    //         // Parse SVG content and create Paper.js paths, shapes, etc.
    //         const svgGroup = new paper.Group();
    //         // You need to write logic here to parse the SVG content and create Paper.js objects
    //         paper.project.importSVG(svgContent, (importedSVG) => {
    //             importedSVG.fitBounds(new paper.Rectangle(new Point(0, 0), new Size(paper.view.size.width, paper.view.size.height)));
    //             svgGroup.addChild(importedSVG);
    //             console.log(svgGroup);
    //             svgGroup.position = paper.view.center;
    //             console.log(svgGroup);
    //             svgGroup.fitBounds(paper.view.bounds);
    //             console.log(svgGroup);

    //         });
    //         // Draw the Paper.js objects onto the canvas
    //         paper.project.activeLayer.addChild(svgGroup);
    //         paper.view.draw();
    //       })
    //       .catch(error => {
    //         console.error('Error fetching SVG content:', error);
    //       });

    //     return () => {
    //       paper.project.clear();
    //       paper.view.remove();
    //     };
    //   }, [connectdoc]);


    return (
        <div>
            <canvas ref={floatref} width={1600} height={1100} ></canvas>
        </div>
    )
}


export default Diafloat