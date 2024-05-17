import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import paper from 'paper'
import { Point, Size } from 'paper/dist/paper-core';
import * as XLSX from 'xlsx';
import { adddlayApi, adddocApi, addeleApi, addflagassi, addtaginfo, getalltags, getareaApi, getdocnames, geteletag, getfiledis, getflagdet, getinfoapi, getsinarea, getsinlay, gettableapi, getcdoc } from '../services/allApis';
import Table from 'react-bootstrap/Table';
import BASE_URL from '../services/base_url';
import axios from 'axios';
import Diafloat from './Diafloat';
import { createRoot } from 'react-dom/client';

function Home() {
    let temarr = []
    var file = {}
    var seltag = '';
    var chitResult
    let svgGroup
    let selectionRectangle;
    let startPoint;
    let srectangle
    let rectvalue


    const originalPosition = new Point(761, 368);



    const canvasRef = useRef(null);

    const viewRef = useRef(null);
    const drawingLayerRef = useRef(null);
    const canvas = canvasRef.current;
    const lastMousePosition = useRef(null);
    const isPanning = useRef(false);
    const [isSideNavOpen, setIsSideNavOpen] = useState(true);
    const [isDiv1Visible, setIsDiv1Visible] = useState(true);
    const [istagsubopt, settagsubopt] = useState(false)
    const [isdocsubopt, setdocsubopt] = useState(false)
    const [show, setShow] = useState(false);
    const [getfile, setgetfile] = useState("")
    const [filename, setfilename] = useState("")
    const [svgContent, setSvgContent] = useState('');
    const [isshowcanvas, setshowcanvas] = useState(false)
    const [isDiv2Visible, setIsDiv2Visible] = useState(false);
    const [iscon1Visible, setIscon1Visible] = useState(true);
    const [panonoff, setpanonoff] = useState(false)
    const [exportmenuone, setexportmenuone] = useState(false);
    const [selectedTexts, setSelectedTexts] = useState([]);
    const [pathIDs, setPathIDs] = useState([]);
    const [enableselect, setenableselect] = useState(false)
    const [enablesinselect, setenablesinselect] = useState(false)
    const [isassignid, setassignid] = useState([])
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
    const [iscon2Visible, setIscon2Visible] = useState(false);
    const [exportmenutwo, setexportmenutwo] = useState(false);
    const [tagassishow, settagassishow] = useState(false);
    const [isassitaglist, setassitaglist] = useState([])
    const [tagid, setSelectedValue] = useState('');
    const [enablewinselect, setenablewinselect] = useState(false)
    const [tabledetail, settablearray] = useState({})
    // const [seltag,setseltag]=useState([])
    const [taginfoshow, settaginfoshow] = useState(false);
    const [areaassishow, setareaassishow] = useState(false)
    const [areaoption, setarea] = useState([])
    const [rectangles, setRectangles] = useState({});
    const [Areaid, setselectvalue] = useState('')
    const [areainfoshow, setareainfoshow] = useState(false);
    const [isdlayerid, setdlayerid] = useState([])
    const [areainfi, setareainfi] = useState({})
    const [istagreview, settagreview] = useState(false)
    const [istagreg, settagreg] = useState(false)
    const [tInputs, settInputs] = useState({
        tagno: "",
        tname: "",
        ttype: ""
    })
    const [isequlist, setequlist] = useState(false)
    const [islinelist, setlinelist] = useState(false)
    const [isdocreview, setdocreview] = useState(false)
    const [isdocreg, setdocreg] = useState(false)
    const [dInputs, setdInputs] = useState({
        docno: "",
        title: "",
        des: "",
        dtype: ""
    })
    const [getdoc, setgetdoc] = useState("")
    const [isdocnames, setisdocnames] = useState([])
    const [isdocdis, setdocdis] = useState('')
    const [isareadetail, setareadetail] = useState([])
    const [flagSelectedValue, setflagSelectedValue] = useState('');
    const [flagassishow, setflagassishow] = useState(false);
    const [flagcdocname, setflagcdocname] = useState('')
    const [issindoc, setsindoc] = useState('')
    const [iscondocdis, setcondocdis] = useState('')
    useEffect(() => {
        let canvas = canvasRef.current;

        if (!canvas) { return; } // Ensure canvasRef is initialized
        else {

            // canvas.width = middleWidth;
            // canvas.height = window.innerHeight;
            paper.setup(canvas);
            if (svgContent) {
                paper.project.clear();
                // Store the view
                viewRef.current = paper.view;
                console.log((viewRef.current));
                // Clear the canvas
                paper.project.activeLayer.removeChildren();
                svgGroup = new paper.Group();
                console.log(svgGroup);
                axios.get(svgContent) // Fetch SVG content from the URL
                    .then(response => {
                        console.log(response);
                        const svgContent = response.data;
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
                // paper.project.importSVG(svgContent, (importedSVG) => {

                //     importedSVG.fitBounds(new paper.Rectangle(new Point(0, 0), new Size(paper.view.size.width, paper.view.size.height)));


                //     // // Set the canvas size to match the SVG content size
                //     // setCanvasSize({ width: importedSVG.bounds.width, height: importedSVG.bounds.height });

                //     console.log(importedSVG);
                //     svgGroup.addChild(importedSVG);
                //     console.log(svgGroup);

                //     // const scalingFactor = Math.min(
                //     //     canvas.width / svgGroup.bounds.width,
                //     //     canvas.height / svgGroup.bounds.height
                //     // );
                //     // svgGroup.scale(scalingFactor);

                //     svgGroup.position = paper.view.center;
                //     svgGroup.fitBounds(paper.view.bounds);


                //     // paper.view.viewSize = new paper.Size(window.innerWidth, window.innerHeight);



                //     paper.view.draw();
                // });

            }
        }
        // // Add event listeners for panning
        // canvasRef.current.addEventListener('mousedown', phandleMouseDown);
        // canvasRef.current.addEventListener('mousemove', phandleMouseMove);
        // canvasRef.current.addEventListener('mouseup', phandleMouseUp);
        // canvasRef.current.addEventListener('mouseleave', phandleMouseLeave);

        // // Cleanup event listeners when component unmounts
        // return () => {
        //     canvasRef.current.removeEventListener('mousedown', phandleMouseDown);
        //     canvasRef.current.removeEventListener('mousemove', phandleMouseMove);
        //     canvasRef.current.removeEventListener('mouseup', phandleMouseUp);
        //     canvasRef.current.removeEventListener('mouseleave', phandleMouseLeave);
        // };

    }, [svgContent])
    useEffect(() => {
        console.log(isassignid);
    }, [isassignid])


    useEffect(() => {
        if (panonoff && canvas) {
            dlayerremove()
            console.log("enter useEffect");
            // setContextMenu({})
            // setinfocontextmenu({})
            enablePanning()
        }

        return () => {
            if (canvas) {
                disablePanning()
            }
        }
    }, [panonoff, canvas])

    useEffect(() => {
        if (enableselect && canvas) {
            dlayerremove()
            console.log("enter useEffect");
            // setContextMenu({})
            // setinfocontextmenu({})
            enableselinteraction()
        }

        return () => {
            if (canvas) {
                disableselinteraction()

            }
        }
    }, [enableselect, canvas])

    useEffect(() => {
        if (enablewinselect && canvas) {
            dlayerremove()
            console.log("enter useEffect");
            // setContextMenu({})
            // setinfocontextmenu({})
            enablewinselinteraction()
        }

        return () => {
            if (canvas) {
                disablewinselinteraction()
            }
        }
    }, [enablewinselect, canvas])

    useEffect(() => {
        if (enablesinselect && canvas) {
            dlayerremove()
            console.log("entered useeffect");
            enablesinselinteraction()
        }
        return () => {
            if (canvas) {
                disablesinselinteraction()
            }
        }
    })

    useEffect(() => {
        handledocnames()
    }, [])

    const enableselinteraction = () => {
        canvas.addEventListener('click', onMouseClick);
    }

    const disableselinteraction = () => {
        canvas.removeEventListener('click', onMouseClick);
        canvas.removeEventListener('contextmenu', onContextMenu);
    }





    const onMouseClick = (event) => {
        console.log(event);
        console.log(isassignid);
        console.log(temarr);
        const isCtrlPressed = event.ctrlKey || event.metaKey;// metaKey for macOS
        if (!isCtrlPressed) {
            paper.project.getItems({ selected: true }).forEach(item => {
                console.log("enter unselect");
                item.selected = false;
            });
            console.log("enter handle")
            const point = new paper.Point(event.clientX - canvasRef.current.getBoundingClientRect().left, event.clientY - canvasRef.current.getBoundingClientRect().top);
            console.log("point:", point);
            const paperPoint = paper.view.viewToProject(point);
            console.log("paperpoint:", paperPoint)
            const hitResult = paper.project.hitTest(paperPoint, {
                // fill: true,
                stroke: true,
                segments: true,
                tolerance: 5,
            });
            console.log("hitresult::", hitResult)
            console.log(hitResult);
            console.log(temarr);
            if (hitResult && hitResult.item) {
                console.log(temarr);
                if (hitResult.item.selected == false) {
                    hitResult.item.selected = true
                    console.log(hitResult.item.id);
                    canvas.addEventListener('contextmenu', onContextMenu);
                    var resid = hitResult.item.id
                    console.log(resid);
                    console.log(temarr);
                    temarr.push(resid)
                    setsindoc(resid)
                    console.log(temarr);
                    setassignid(temarr)
                    temarr = []
                }
            }
            else {
                // if(hitResult.item.selected== true){
                //     hitResult.item.selected = false
                // }
                setContextMenu({ visible: false, x: 0, y: 0 })
                canvas.removeEventListener('contextmenu', onContextMenu);
                paper.project.getItems({ selected: true }).forEach(item => {
                    console.log("enter unselect");
                    item.selected = false;
                });
                temarr = []
            }
        }
        else {
            console.log("enter handle")
            const point = new paper.Point(event.clientX - canvasRef.current.getBoundingClientRect().left, event.clientY - canvasRef.current.getBoundingClientRect().top);
            console.log("point:", point);
            const paperPoint = paper.view.viewToProject(point);
            console.log("paperpoint:", paperPoint)
            const hitResult = paper.project.hitTest(paperPoint, {
                // fill: true,
                stroke: true,
                segments: true,
                tolerance: 5,
            });
            console.log("hitresult::", hitResult)
            console.log(hitResult);

            if (hitResult && hitResult.item) {
                if (hitResult.item.selected == false) {
                    hitResult.item.selected = true
                    console.log(hitResult.item.id);
                    canvas.addEventListener('contextmenu', onContextMenu);
                    var resid = hitResult.item.id
                    console.log(resid);
                    temarr.push(resid)

                    setassignid(temarr)

                }

            }
            else {
                // if(hitResult.item.selected== true){
                //     hitResult.item.selected = false
                // }
                setContextMenu({ visible: false, x: 0, y: 0 })
                canvas.removeEventListener('contextmenu', onContextMenu);
                // paper.project.getItems({ selected: true }).forEach(item => {
                //     item.selected = false;
                // });
            }
        }
    }

    const onContextMenu = (event) => {
        event.preventDefault(); // Prevent the default context menu

        setContextMenu({
            visible: true,
            x: event.pageX,
            y: event.pageY,
        });
    }


    const spidallops = () => {
        setenableselect(false)
        setenablewinselect(false)
        setpanonoff(false)
        setenablesinselect(false)
        dlayerremove()
        setselectvalue(false)
        setSvgContent('')
        setIscon1Visible(false)
        setIscon2Visible(false)
        // drawingLayerRef.current.remove();
    }


    const handlespidopt = () => {
        setIsDiv1Visible(true)
        spidallops()
        settagsubopt(false)
        settagreview(false)
        settagreg(false)
        setequlist(false)
        setlinelist(false)
        setdocsubopt(false)
        setdocreview(false)
        setdocreg(false)
    }

    const handlelineopt = () => {
        setIsDiv1Visible(false)
        spidallops()
        settagreview(false)
        setlinelist(true)
        setequlist(false)
        settagreg(false)
        settagsubopt(false)
        setdocsubopt(false)
        setdocreview(false)
        setdocreg(false)
    }

    const handleequopt = () => {
        setIsDiv1Visible(false)
        spidallops()
        settagreview(false)
        setlinelist(false)
        setequlist(true)
        settagreg(false)
        settagsubopt(false)
        setdocsubopt(false)
        setdocreview(false)
        setdocreg(false)
    }

    const handletagsubopt = () => {
        setIsDiv1Visible(false)
        spidallops()
        settagsubopt(true)
        settagreview(true)
        setlinelist(false)
        setequlist(false)
        settagreg(false)
        setdocsubopt(false)
        setdocreview(false)
        setdocreg(false)
    }

    const handletagoptrev = () => {
        setIsDiv1Visible(false)
        spidallops()
        settagreview(true)
        setlinelist(false)
        setequlist(false)
        settagreg(false)
        setdocsubopt(false)
        setdocreview(false)
        setdocreg(false)
    }

    const handletagoptreg = () => {
        setIsDiv1Visible(false)
        spidallops()
        settagreview(false)
        setlinelist(false)
        setequlist(false)
        settagreg(true)
        setdocsubopt(false)
        setdocreview(false)
        setdocreg(false)
    }

    const handledocopt = () => {
        setIsDiv1Visible(false)
        spidallops()
        settagreview(false)
        setlinelist(false)
        setequlist(false)
        settagreg(false)
        setdocsubopt(true)
        setdocreview(true)
        setdocreg(false)
        settagsubopt(false)
    }

    const handledocoptreview = () => {
        setIsDiv1Visible(false)
        spidallops()
        settagreview(false)
        setlinelist(false)
        setequlist(false)
        settagreg(false)
        settagsubopt(false)
        setdocreview(true)
        setdocreg(false)
    }

    const handledocoptreg = () => {
        setIsDiv1Visible(false)
        spidallops()
        settagreview(false)
        setlinelist(false)
        setequlist(false)
        settagreg(false)
        settagsubopt(false)
        setdocreview(false)
        setdocreg(true)
    }



    const handlesidetoggle = () => {
        // if (middleWidth === '72.5%') {
        //     setMiddleWidth('89%')
        //     setIsSideNavOpen(false)
        //     // setcanvasleftm('0%')

        // }
        // // //    else if(middleWidth==''){

        // // //    }
        // else {
        setIsSideNavOpen(false)
        //     setMiddleWidth('100%');
        //     // setcanvasleftm('0%')
        // }
    }


    const handleopensidetoggle = () => {
        // if (middleWidth === '89%') {
        //     setMiddleWidth('72.5%')
        //     // setcanvasleftm('16.5%')
        //     // setcanvasrightm('11%')
        //     setIsSideNavOpen(true)
        // }
        // else {
        setIsSideNavOpen(true)
        //     setMiddleWidth('83.5%');
        //     // setcanvasleftm('16.5%')
        // }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleZoomOut = (e) => {
        dlayerremove()
        document.querySelectorAll('.button').forEach(button => {
            button.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        e.target.classList.add('active');
        console.log(viewRef);
        if (viewRef.current.zoom > 1) {
            viewRef.current.zoom *= 0.9;
        }

    }
    // 0.9900000000000001
    const handleZoomIn = (e) => {
        dlayerremove()
        document.querySelectorAll('.button').forEach(button => {
            button.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        e.target.classList.add('active');
        console.log(viewRef);
        viewRef.current.zoom *= 1.1;
    }

    const handlepan = (e) => {
        setenableselect(false)
        setenablewinselect(false)
        setenablesinselect(false)
        document.querySelectorAll('.button').forEach(button => {
            button.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        e.target.classList.add('active');
        setpanonoff(true)
    }

    const handlefitview = (e) => {
        dlayerremove()
        // svgGroup.position = paper.view.center;
        document.querySelectorAll('.button').forEach(button => {
            button.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        e.target.classList.add('active');
        setpanonoff(false)
        console.log(viewRef);
        viewRef.current.zoom = 0.9900000000000001
        viewRef.current.center = originalPosition;
        // originalPosition.x = viewRef.current.center.x;
        // originalPosition.y = viewRef.current.center.y;
        // viewRef.current.center=paper.view.center
        //  viewRef.current.center=fcenter.center
        // if(delta !==''){
        //     delta.x=0
        //     delta.y=0
        // viewRef.current.center.x=0
        // viewRef.current.center.y=0
        // }
    }

    const handleexportMenuone = () => {
        setexportmenuone(true)
        setenableselect(false)
        setenablewinselect(false)
        setenablesinselect(false)
        dlayerremove()
        paper.project.activeLayer.children.forEach(sitem => {

            const texts = paper.project.getItems({
                class: paper.PointText,
            }).map(item => item.content);

            setSelectedTexts(texts);

            const IDs = paper.project.getItems({
                class: paper.Path,
            }).map(item => item._id);

            setPathIDs(IDs);

        });
    }

    const enablePanning = () => {
        canvas.addEventListener('mousedown', phandleMouseDown);
        canvas.addEventListener('mousemove', phandleMouseMove);
        canvas.addEventListener('mouseup', phandleMouseUp);
        canvas.addEventListener('mouseleave', phandleMouseLeave);
    };

    const disablePanning = () => {

        canvas.removeEventListener('mousedown', phandleMouseDown);
        canvas.removeEventListener('mousemove', phandleMouseMove);
        canvas.removeEventListener('mouseup', phandleMouseUp);
        canvas.removeEventListener('mouseleave', phandleMouseLeave);
    }

    const phandleMouseUp = () => {
        isPanning.current = false;
    };

    const phandleMouseLeave = () => {
        isPanning.current = false;
    };

    const phandleMouseMove = (event) => {

        if (isPanning.current) {

            console.log(isPanning.current);
            const delta = new Point(event.offsetX, event.offsetY).subtract(lastMousePosition.current);
            console.log(delta);
            viewRef.current.center = viewRef.current.center.subtract(delta);
            console.log(viewRef.current.center);
            lastMousePosition.current = new Point(event.offsetX, event.offsetY);
            console.log(lastMousePosition.current);
        }
    };

    const phandleMouseDown = (event) => {
        isPanning.current = true;
        lastMousePosition.current = new Point(event.offsetX, event.offsetY);
        console.log(lastMousePosition.current);
        console.log(isPanning.current);
    };

    const handlecloseexport = () => {
        setexportmenuone(false)
        // setexportmenutwo(false)
    };

    const handleexId = () => {
        console.log(pathIDs);
        const data = [['Path IDs'], ...pathIDs.map(id => [id])];
        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Path IDs');
        XLSX.writeFile(wb, 'path_ids.xlsx');
    }

    const handleextext = () => {
        if (selectedTexts.length === 0) {
            console.warn("No text data to export.");
            return;
        }
        // Create a worksheet
        const ws = XLSX.utils.json_to_sheet(selectedTexts.map((text, index) => ({ Text: text, Index: index + 1 })));
        // Create a workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'TextData');
        // Save the workbook as an Excel file
        XLSX.writeFile(wb, 'TextData.xlsx');
        console.log(wb);
    }

    const handleselect = (e) => {
        setenablewinselect(false)
        document.querySelectorAll('.button').forEach(button => {
            button.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        e.target.classList.add('active');
        setenableselect(true)
    }

    const handleeditpan = () => {
        setIscon1Visible(!iscon1Visible);
        setIscon2Visible(!iscon2Visible);
        // if (middleWidth == '100%') {
        //     setMiddleWidth('89%')
        // }
        // else {
        //     setMiddleWidth('72.5%')
        // }

    }

    const handleassigntag = () => {
        settagassishow(true)
        gettagdata()
    }

    const handleexportMenutwo = () => {
        setexportmenutwo(true)
        dlayerremove()
        paper.project.activeLayer.children.forEach(sitem => {

            const texts = paper.project.getItems({
                class: paper.PointText,
            }).map(item => item.content);

            setSelectedTexts(texts);

            const IDs = paper.project.getItems({
                class: paper.Path,
            }).map(item => item._id);

            setPathIDs(IDs);

        });
    }

    const handlemineditpan = () => {
        setIscon1Visible(!iscon1Visible);
        setIscon2Visible(!iscon2Visible);
        // if (middleWidth == '89%') {
        //     setMiddleWidth('100%')
        // }
        // else {
        //     setMiddleWidth('83.5%')
        // }
    }


    const gettagdata = async () => {
        const result = await geteletag()
        console.log(result.data);
        setassitaglist(result.data)
    }

    const handletagassiClose = () => {

        settagassishow(false);
    }

    const handleChange = (event) => {
        console.log(isassitaglist);
        console.log(event.target.value);
        setSelectedValue(event.target.value);

    };


    const handleeletagassign = async (e) => {

        e.preventDefault()
        console.log(tagid);
        console.log("enter function");
        console.log(isassignid);
        for (let i = 0; i < isassignid.length; i++) {
            // console.log("enter for loop");
            var elementid = isassignid[i]
            console.log(elementid);
            var bdata = { elementid, tagid, filename }
            console.log(bdata);
            const result = await addeleApi(bdata)
            console.log(result);
            if (result.status >= 200 && result.status < 300) {
                settagassishow(false)
            }
        }
        console.log("reached end");

        setassignid([])
        alert("Tag assigned")
        temarr = []
        paper.project.getItems({ selected: true }).forEach(item => {
            console.log("enter unselect");
            item.selected = false;
        });
        // setShow(false)
    }

    const enablesinselinteraction = () => {
        console.log("entered interaction");
        canvas.addEventListener('click', onsingleClick);
    }
    const disablesinselinteraction = () => {
        canvas.removeEventListener('click', onsingleClick);
    }



    const onsingleClick = async (event) => {

        console.log("enter handle")
        const point = new paper.Point(event.clientX - canvasRef.current.getBoundingClientRect().left, event.clientY - canvasRef.current.getBoundingClientRect().top);
        console.log("point:", point);
        const paperPoint = paper.view.viewToProject(point);
        console.log("paperpoint:", paperPoint)
        const hitResult = paper.project.hitTest(paperPoint, {
            // fill: true,
            stroke: true,
            segments: true,
            tolerance: 5,
        });
        console.log("hitresult::", hitResult)
        console.log(hitResult);

        if (hitResult && hitResult.item) {
            if (hitResult.item.selected == false) {
                console.log(temarr);
                hitResult.item.selected = true
                console.log(hitResult.item.id);
                canvas.addEventListener('contextmenu', onContextMenu);
                var resid = hitResult.item.id
                console.log(resid);
                console.log(temarr);
                temarr.push(resid)
                console.log(temarr);
                // setassignid(temarr)
                // temarr = []
                for (let i = 0; i < temarr.length; i++) {
                    var elementid = temarr[i]
                    console.log(elementid);
                    const result = await getinfoapi(elementid)
                    console.log(result);
                    if (result.status >= 200 && result.status < 300) {
                        var key = result.data
                        // const seresult = await getgroupapi(key)
                        // console.log(seresult);
                        // setinfoarray(seresult.data)

                        const thresult = await gettableapi(key)
                        console.log(thresult);
                        settablearray(thresult.data)
                        console.log(key);
                        const alltresult = await getalltags(key)
                        console.log(alltresult.data);
                        seltag = alltresult.data
                        // handlealltag()

                        for (let i = 0; i < seltag.length; i++) {
                            paper.project.getItems({ class: paper.Path, }).forEach(item => {
                                if (seltag[i] == item.id) {
                                    // console.log(item);
                                    // console.log(item.id);
                                    item.selected = true
                                }
                            });
                        }
                        settaginfoshow(true)
                    }
                    else {
                        paper.project.getItems({ selected: true }).forEach(item => {
                            console.log("enter unselect");
                            item.selected = false;
                        });
                    }

                }

            }
            temarr = []
        }
        else {
            // if(hitResult.item.selected== true){
            //     hitResult.item.selected = false
            // }
            setContextMenu({ visible: false, x: 0, y: 0 })
            canvas.removeEventListener('contextmenu', onContextMenu);
            paper.project.getItems({ selected: true }).forEach(item => {
                console.log("enter unselect");
                item.selected = false;
            });
        }

    }


    // const handleshowtaginfo = async () => {
    //     console.log("enter function");
    //     console.log(isassignid);
    //     for (let i = 0; i < isassignid.length; i++) {
    //         var elementid = isassignid[i]
    //         console.log(elementid);
    //         const result = await getinfoapi(elementid)
    //         console.log(result);
    //         if (result.status >= 200 && result.status < 300) {
    //             var key = result.data
    //             // const seresult = await getgroupapi(key)
    //             // console.log(seresult);
    //             // setinfoarray(seresult.data)
    //             const thresult = await gettableapi(key)
    //             console.log(thresult);
    //             settablearray(thresult.data)
    //             console.log(key);
    //             const alltresult = await getalltags(key)
    //             console.log(alltresult.data);
    //             seltag = alltresult.data
    //             // handlealltag()
    //             for (let i = 0; i < seltag.length; i++) {
    //                 paper.project.getItems({ class: paper.Path, }).forEach(item => {
    //                     if (seltag[i] == item.id) {
    //                         // console.log(item);
    //                         // console.log(item.id);
    //                         item.selected = true
    //                     }
    //                 });
    //             }
    //             settaginfoshow(true)
    //         }
    //     }
    // }


    const handletaginfo = (e) => {
        document.querySelectorAll('.button').forEach(button => {
            button.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        e.target.classList.add('active');
        dlayerremove()
        paper.project.getItems({ selected: true }).forEach(item => {
            console.log("enter unselect");
            item.selected = false;
        });
        setenableselect(false)
        setenablewinselect(false)
        e.preventDefault()
        setenablesinselect(true)
        console.log("taginfoend");
    }

    // const handlealltag=()=>{
    //     console.log(seltag);
    //     for (let i = 0; i < seltag.length; i++) {
    //         paper.project.getItems({ class: paper.Path, }).forEach(item => {
    //             if (item == seltag[i]) {
    //                 console.log(item);
    //                 console.log(item.id);
    //                 item.selected = true
    //             }
    //         });
    //     }
    // }

    const handlewindowselect = (e) => {
        setenableselect(false)
        // Remove 'active' class from all buttons
        document.querySelectorAll('.button').forEach(button => {
            button.classList.remove('active');
        });

        paper.project.getItems({ class: paper.Path, }).forEach(item => {
            item.selected = false
        });

        // Add 'active' class to the clicked button
        e.target.classList.add('active');
        setenablewinselect(true)
    }

    const enablewinselinteraction = () => {
        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mousemove', onMouseDrag);
        canvas.addEventListener('mouseup', onMouseUp);
    }

    const disablewinselinteraction = () => {
        canvas.removeEventListener('mousedown', onMouseDown);
        canvas.removeEventListener('mousemove', onMouseDrag);
        canvas.removeEventListener('mouseup', onMouseUp);
    }

    const onMouseDown = (event) => {
        paper.project.getItems({ selected: true }).forEach(item => {
            item.selected = false;
        });
        console.log(event);
        console.log(event.clientX);
        console.log(event.clientY);
        // Calculate the correct mouse position taking into account the canvas position.
        const rect = canvas.getBoundingClientRect();
        console.log(rect);
        // const x = event.clientX ;
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // const mouseX = event.clientX - rect.left;
        // const mouseY = event.clientY - rect.top;

        // const x = event.clientX ;
        // const y = event.clientY ;

        // const x = (mouseX / rect.width) * 2 - 1;
        // const y = -(mouseY / rect.height) * 2 + 1;

        startPoint = new paper.Point(x, y);
        selectionRectangle = new paper.Path.Rectangle(startPoint, startPoint);
        console.log(selectionRectangle);
        selectionRectangle.strokeColor = 'blue';
        selectionRectangle.strokeWidth = 1;
    };

    const onMouseDrag = (event) => {
        if (selectionRectangle) {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const endPoint = new paper.Point(x, y);

            selectionRectangle.remove(); // Remove the previous rectangle
            selectionRectangle = new paper.Path.Rectangle(startPoint, endPoint);
            selectionRectangle.strokeColor = 'blue';
            selectionRectangle.strokeWidth = 1;
        }
    };

    const onMouseUp = () => {
        if (selectionRectangle) {
            paper.project.getItems({ class: paper.Path, }).forEach(item => {
                if (item.isInside(selectionRectangle.bounds)) {
                    console.log(item);
                    console.log(item.id);
                    item.selected = true
                    canvas.addEventListener('contextmenu', onContextMenu);
                    var winid = item.id
                    temarr.push(winid)
                    setassignid(temarr)

                }
                else {
                    canvas.removeEventListener('contextmenu', onContextMenu);
                }
            });
            // Remove the selection rectangle
            selectionRectangle.remove();
            selectionRectangle = null;
            temarr = []
        }
    };

    const handletaginfoClose = () => settaginfoshow(false)

    const getareadata = async () => {
        const aresult = await getareaApi()
        console.log(aresult.data);
        setarea(aresult.data)
    }

    const handleassignarea = () => {
        setareaassishow(true)
        getareadata()
    }

    const handleareaassiclose = () => {
        setareaassishow(false)

    }

    const handledrawarea = (e) => {
        setenableselect(false)
        setenablesinselect(false)
        setenablewinselect(false)
        document.querySelectorAll('.button').forEach(button => {
            button.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        e.target.classList.add('active');
        // setenabledrawarea(true)
        drawingLayerRef.current = new paper.Layer({ name: 'drawingLayer' });
        drawingLayerRef.current.activate();
        const tool = new paper.Tool();

        tool.onMouseDown = function (event) {
            startPoint = event.point; // Store the starting point when the mouse is pressed
            // Ensure there's only one rectangle at a time
            drawingLayerRef.current.removeChildren();
        };
        tool.onMouseDrag = function (event) {
            // Remove the previous rectangle
            drawingLayerRef.current.removeChildren();

            // Calculate the width and height of the rectangle
            const width = event.point.x - startPoint.x;
            const height = event.point.y - startPoint.y;

            // Create a rectangle using the starting point and current mouse position
            const rectangle = new paper.Path.Rectangle(startPoint, new paper.Point(event.point.x, event.point.y));
            rectangle.strokeColor = 'red';
            // rectangle.fillColor=new paper.Color(1, 0, 0, 0.3)
            rectangle.fillColor = 'red'; // Set fill color to red
            rectangle.fillColor.alpha = 0.5; // Set opacity to 50% for transparency
            rectangle.strokeWidth = 2; // Set stroke width

            drawingLayerRef.current.addChild(rectangle);

            setRectangles({
                x: startPoint.x,
                y: startPoint.y,
                width: width,
                height: height
            })

        };

        tool.onMouseUp = function (event) {
            console.log(rectangles);
        };

    }

    const handleareachange = (event) => {
        console.log(event.target.value);
        setselectvalue(event.target.value)
    }

    const handlesavelayer = async (e) => {
        document.querySelectorAll('.button').forEach(button => {
            button.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        e.target.classList.add('active');
        e.preventDefault()
        console.log(rectangles);
        const { x, y, width, height } = rectangles
        const layerrect = { Areaid, x, y, width, height, filename }
        console.log(layerrect);
        const lresult = await adddlayApi(layerrect)
        console.log(lresult);
        if (lresult.status >= 200 && lresult.status < 300) {
            alert('layer added')
            setRectangles({})
            // drawingLayer.activate();
            drawingLayerRef.current.remove();
            setareaassishow(false)
            // paper.project.clear();
        }
        else {
            alert('error')
            // drawingLayer.activate();
            drawingLayerRef.current.remove();
            setareaassishow(false)
            // paper.project.clear();

        }
    }

    const getareainfi = async (id) => {
        // console.log(Dareaid);
        console.log(id);
        const result = await getsinarea(id)
        console.log(result);
        setareainfi(result.data)
    }

    const getsinglelayer = async (id) => {
        let dlayerid = []
        const sresult = await getsinlay(id)
        console.log(sresult);
        rectvalue = sresult.data

        // const sresult = await getsinlay(id)
        // console.log(sresult);
        // isshowlayd(sresult.data[0])
        // const rectvalue = sresult.data[0]
        // isshowlayd(rectvalue)
        // const rectvalue = sresult.data[0]
        console.log(rectvalue);
        const { Areaid, x, y, height, width } = rectvalue
        console.log(Areaid);
        console.log(x);
        console.log(y);
        // aid=Areaid
        // console.log(aid);
        // setdareaid(Areaid)
        const spoint = new paper.Point(x, y)
        srectangle = new paper.Rectangle(spoint, new paper.Size(width, height));
        const rpath = new paper.Path.Rectangle(srectangle);
        rpath.strokeColor = 'red';
        rpath.fillColor = 'red';
        rpath.fillColor.alpha = 0.3;
        rpath.strokeWidth = 2
        drawingLayerRef.current.addChild(rpath)

        rpath.onMouseUp = (event) => {
            console.log("enter show");
            getareainfi(Areaid)
            // Handle mouse click event
            if (event.event.button === 0) { // Check for left mouse click
                // Perform action when rectangle is clicked
                console.log('Rectangle clicked:', rpath);
                rpath.strokeColor = 'blue'

                setareainfoshow(true);

            }
        };

        paper.project.getItems({ class: paper.Path }).forEach(item => {
            console.log(item);
            console.log(rpath.bounds);
            // Check if the item is fully inside or intersects with the selection rectangle
            // || selectionRectangle.bounds.intersects(item.bounds)
            if (item.isInside(rpath.bounds)) {
                //|| selectionRectangle.bounds.intersects(item.bounds)
                console.log(item._id);
                dlayerid.push(item._id)
                // item.selected = true; // Select the item
            }
        });
        setdlayerid(dlayerid)

    }

    const dlayerremove = () => {
        if (drawingLayerRef.current !== null) {
            drawingLayerRef.current.remove()
        }
    }


    const handleshowsavedlayer = (e) => {
        document.querySelectorAll('.button').forEach(button => {
            button.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        e.target.classList.add('active');
        console.log(drawingLayerRef.current);
        dlayerremove()
        drawingLayerRef.current = new paper.Layer({ name: 'drawingLayer' });
        drawingLayerRef.current.activate();
        console.log(drawingLayerRef.current);
        // console.log(filename);
        getsinglelayer(filename)

    }

    const setInputs = (e) => {

        const { value, name } = e.target
        if (name == 'tagno') {
            settInputs({ ...tInputs, [name]: value })
        }
        if (name == 'tname') {
            settInputs({ ...tInputs, [name]: value })
        }
        if (name == 'ttype') {
            settInputs({ ...tInputs, [name]: value })
        }
    }

    const handleReg = async (e) => {
        e.preventDefault()
        console.log(tInputs);
        const lresult = await addtaginfo(tInputs)
        console.log(lresult);
        if (lresult.status >= 200 && lresult.status < 300) {
            alert('Tag added')
            settInputs("")
        }
        else {
            alert('error')
            settInputs("")
        }

    }

    const handledInputs = (e) => {
        const { value, name } = e.target
        if (name == 'docno') {
            setdInputs({ ...dInputs, [name]: value })
        }
        if (name == 'title') {
            setdInputs({ ...dInputs, [name]: value })
        }
        if (name == 'des') {
            setdInputs({ ...dInputs, [name]: value })
        }
        if (name == 'dtype') {
            setdInputs({ ...dInputs, [name]: value })
        }
    }

    const handledocadd = (event) => {
        console.log(event);
        file = event.target.files[0];
        console.log(file);
        setgetdoc(file)
    }

    const doctype = [
        { code: 'AA', name: 'Accounting/Budget' },
        { code: 'CA', name: 'Analysis, test and calculation' },
        { code: 'DS', name: 'Data sheets' },
        { code: 'FD', name: 'Project design criteria and philosophies' },
        { code: 'iKA', name: 'Interactive procedures' },
        { code: 'iXB', name: 'Smart P&ID' },
        { code: 'iXX', name: 'H-Doc' },
        { code: 'KA', name: 'Procedures' },
        { code: 'LA', name: 'List/Registers' },
        { code: 'MA', name: 'Equipment user manual (ref. NS5820)' },
        { code: 'MB', name: 'Operating and maintenance instructions' },
        { code: 'MC', name: 'Spare parts list' },
        { code: 'PA', name: 'Purchase orders' },
        { code: 'PB', name: 'Blanket order/frame agreement' },
        { code: 'PD', name: 'Contract' },
        { code: 'RA', name: 'Reports' },
        { code: 'RD', name: 'System design reports and system user manuals' },
        { code: 'RE', name: 'DFI (Design - Fabrication - Installation) resumes' },
        { code: 'SA', name: 'Specifications & Standards' },
        { code: 'TA', name: 'Plans/schedules' },
        { code: 'TB', name: 'Work plan' },
        { code: 'TE', name: 'Estimates' },
        { code: 'TF', name: 'Work package' },
        {
            code: 'VA', name: 'Manufacturing/Fabrication and verifying documentation, including certificate of performance, material tractability, weld and '
                + 'NDE documents, list of certificates, third party verification/certificates and photos of submerged structures/equipment'
        },
        { code: 'VB', name: 'Certificates' },
        { code: 'XA', name: 'Flow diagrams' },
        { code: 'XB', name: 'Pipe and instrument diagram (P&ID)' },
        { code: 'XC', name: 'Duct and instrument diagrams (D&ID)' },
        { code: 'XD', name: 'General arrangement' },
        { code: 'XE', name: 'Layout drawings' },
        { code: 'XF', name: 'Location drawings (plot plans)' },
        {
            code: 'XG', name: 'Structural information;  including main structural steel, secondary/outfitting steel, structural fire protection and '
                + 'acoustic/thermal insulation and fire protection'
        },
        { code: 'XH', name: 'Free span calculation' },
        { code: 'XI', name: 'System topology and block diagrams' },
        { code: 'XJ', name: 'Single line diagrams' },
        { code: 'XK', name: 'Circuit diagrams' },
        { code: 'XL', name: 'Logic diagrams' },
        { code: 'XM', name: 'Level diagrams' },
        { code: 'XN', name: 'Isometric drawings, including fabrication, heat tracing, stress and pressure testing' },
        { code: 'XO', name: 'Piping supports' },
        { code: 'XQ', name: 'Pneumatic/hydraulic connection drawings' },
        { code: 'XR', name: 'Cause and effect' },
        { code: 'XS', name: 'Detail cross sectional drawings' },
        { code: 'XT', name: 'Wiring diagrams' },
        { code: 'XU', name: 'Loop diagram' },
        { code: 'XX', name: 'Drawings - miscellaneous' },
        { code: 'ZA', name: 'EDP documentation' }
    ]

    const handledocReg = async (e) => {
        e.preventDefault()
        console.log(getdoc);

        const { docno, title, des, dtype } = dInputs

        const headerConfig = {
            "Content-Type": "multipart/form-data"
        }
        const data = new FormData()
        data.append("docno", docno)
        data.append("title", title)
        data.append("des", des)
        data.append("fileload", getdoc)
        data.append("dtype", dtype)
        console.log(data);
        const result = await adddocApi(data, headerConfig)
        console.log(result);
        if (result.status >= 200 && result.status < 300) {
            alert("document added")
            setdInputs({
                ...dInputs,
                dno: "",
                dname: ""
            })

            setgetfile("")
        }
        else {
            alert("error")
        }

    }

    const handledocnames = async () => {

        const docresult = await getdocnames()
        console.log(docresult);
        console.log(docresult.data);
        setisdocnames(docresult.data)
    }

    const handledocdis = async (id) => {
        console.log(id);
        setfilename(id)
        const disresult = await getfiledis(id)
        console.log(disresult);
        setdocdis(`${BASE_URL}/UPLOADS/${disresult.data}`)
        // setSvgContent(isdocdis)
        // setshowcanvas(true)
        setIsDiv1Visible(!isDiv1Visible);
        setIsDiv2Visible(!isDiv2Visible);
    }


    useEffect(() => {
        console.log(isdocdis);
        setSvgContent(isdocdis)
        setshowcanvas(true)
    }, [isdocdis])

    const getflagdata = async () => {
        const flaresult = await getflagdet()
        console.log(flaresult.data);
        setareadetail(flaresult.data)
    }




    const handleflagassign = () => {
        getflagdata()
        setflagassishow(true)
    }

    const handleflagChange = (event) => {
        console.log(isareadetail);
        console.log(event.target.value);
        setflagSelectedValue(event.target.value);

    };

    const handleflagassiClose = () => {
        setflagassishow(false)
    }

    const handleflagcdocChange = (event) => {
        console.log(event.target.value);
        setflagcdocname(event.target.value)
    }

    const handleflagassidetails = async (e) => {
        e.preventDefault()
        console.log(flagcdocname);
        console.log(flagSelectedValue);
        console.log(filename);
        // console.log(tagid);
        // console.log("enter function");
        console.log(isassignid);
        for (let i = 0; i < isassignid.length; i++) {
            // console.log("enter for loop");
            var elementid = isassignid[i]
            console.log(elementid);
            var bdata = { elementid, flagSelectedValue, filename, flagcdocname }
            console.log(bdata);
            const faresult = await addflagassi(bdata)
            console.log(faresult);
            if (faresult.status >= 200 && faresult.status < 300) {
                console.log("flag assign success ");
                setflagassishow(false)
            }
        }
        // console.log("reached end");

        // setassignid([])
        // alert("Tag assigned")
        // temarr = []
        // paper.project.getItems({ selected: true }).forEach(item => {
        //     console.log("enter unselect");
        //     item.selected = false;
        // });
    }

    const handlegetcdoc = async (id) => {
        const cdnresult = await getcdoc(id)
        console.log(cdnresult);
        if (cdnresult.status >= 200 && cdnresult.status < 300) {
            const cdurlresult = await getfiledis(cdnresult.data)
            console.log(cdurlresult);
            console.log(cdurlresult.data);
            // setcondocdis(`${BASE_URL}/UPLOADS/${cdurlresult.data}`)
            let cdn=`${BASE_URL}/UPLOADS/${cdurlresult.data}`
            // const documentUrl = cdurlresult.data
            // // // Open a new window with the document URL
            // // window.open(documentUrl, '_blank');
            const windowFeatures = 'width=800,height=600,resizable=yes,scrollbars=yes';
            // // Open a new window with the document URL and specified options
            // window.open(documentUrl, '_blank', windowFeatures);

            const newWindow = window.open('', '_blank', windowFeatures);
            newWindow.document.write('<div id="upload-container"></div>');

            // Render UploadFileComponent in the new window
            const uploadContainer = newWindow.document.getElementById('upload-container');
            // ReactDOM.render(<Diafloat connectdoc={cdurlresult.data}/>, uploadContainer);
            // Create a root for concurrent rendering
            const root = createRoot(uploadContainer);
            root.render(<Diafloat connectdoc={cdn} />);
        }
    }

    const handlefldiaassi = () => {
        canvas.removeEventListener('contextmenu', onContextMenu);
        handlegetcdoc(issindoc)
    }




    const handleFileChange = (event) => {
        console.log(event);
        file = event.target.files[0];
        console.log(file);
        setgetfile(file)

        var filnam = file.name
        console.log(filnam);
        setfilename(filnam)

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                console.log(content);
                setSvgContent(content);
                setshowcanvas(true);

            };
            reader.readAsText(file);
            setIsDiv1Visible(!isDiv1Visible);
            setIsDiv2Visible(!isDiv2Visible);
        }
    };

    return (
        <div className="cont">
            {isSideNavOpen ?
                <div className="left border border-1 border-danger" id="sideNav">
                    <div id="spidSideLnk" class="sideLnkInactive" onClick={handlespidopt}>

                        <i class="fa-regular fa-pen-to-square sideLnkIcon"></i>
                        <a class="sideLnk">Smart P&ID</a>
                    </div>
                    <div id="lineListSideLnk" class="sideLnkInactive" onClick={handlelineopt}>
                        <i class="fa fa-list-alt sideLnkIcon"></i>
                        <a class="sideLnk" >Line List</a>
                    </div>
                    <div id="equipListSideLnk" class="sideLnkInactive" onClick={handleequopt}>
                        <i class="fa fa-list-alt sideLnkIcon"></i>
                        <a class="sideLnk" >Equipment List</a>
                    </div>
                    <div id="tagsSideLnk" class="sideLnkInactive" onClick={handletagsubopt}>
                        <i class="fa fa-tags sideLnkIcon"></i>
                        <a class="sideLnk" >Tags</a>
                    </div>
                    {istagsubopt && <div>
                        <div id='tagsubopt' onClick={handletagoptrev}>Review</div>
                        <div id='tagsubopt' onClick={handletagoptreg}>Register</div>
                    </div>}
                    <div id="docsSideLnk" class="sideLnkInactive" onClick={handledocopt}>
                        <i class="fa fa-book sideLnkIcon"></i>
                        <a class="sideLnk">Documents</a>
                    </div>
                    {isdocsubopt && <div>
                        <div id='docsubopt' onClick={handledocoptreview}>Review</div>
                        <div id='docsubopt' onClick={handledocoptreg}>Register</div>
                    </div>}

                    <img src="images/tree.png" id="hsSideNav" onClick={handlesidetoggle} />
                </div> : <img src="images/tree.png" id="nonhsSideNav" onClick={handleopensidetoggle} />}

            {isSideNavOpen ?
                // <div className="middle border border-1 border-black" id='maxmain' style={{ display: isDiv1Visible ? 'block' : 'none', width: '83.5%' }}>
                //     <div class='tabDiv sideLnkDiv'>
                //         <div style={{ backgroundColor: 'black' }}>
                //             <div class='action-bar'>
                //                 <h1>Smart P&IDs</h1>
                //                 <i class="fa fa-plus" onClick={handleShow}></i>
                //             </div>
                //         </div >
                //     </div>
                // </div> 
                <div id='maxmain' style={{ display: isDiv1Visible ? 'block' : 'none', width: '83.5%' }}>
                    {isdocnames.map((name, index) => (<div className='button' key={index} style={{ color: 'black', backgroundColor: 'gray', cursor: 'pointer' }} onClick={() => handledocdis(name)}>{name} </div>))}
                </div>
                :
                <div className="middle border border-1 border-black" id='main' style={{ display: isDiv1Visible ? 'block' : 'none', width: '100%' }}>

                    <div class='tabDiv sideLnkDiv'>
                        <div style={{ backgroundColor: 'black' }}>
                            <div class='action-bar'>
                                <h1>Smart P&IDs</h1>
                                <i class="fa fa-plus" onClick={handleShow} ></i>
                            </div>
                        </div>
                    </div>
                </div>
            }



            {isshowcanvas &&
                // <div style={{ display: isDiv2Visible ? 'block' : 'none',width: middleWidth , position: 'fixed', height: '100%', marginLeft: canvasleftm }} className='border border-4 border-success '>
                // <canvas ref={canvasRef} className='border border-1 border-danger' style={{height:'100%',position:'absolute',width:middleWidth}}  />
                // </div>
                // onContextMenu={handleContextMenu}
                <canvas ref={canvasRef} className='border border-1 border-danger' style={{ display: isDiv2Visible ? 'block' : 'none', width: '100%', position: 'fixed', height: '100%' }} ></canvas>

            }

            {/* {isfloatcanvas &&
                <canvas ref={floatref}></canvas>
            } */}




            {contextMenu.visible && (
                <ul className="context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
                    <li onClick={handlefldiaassi}>Connect Document</li>
                </ul>
            )}



            {isshowcanvas && <div id='rightopt' style={{ display: iscon1Visible ? 'block' : 'none' }}>
                <i class="spidControl fa-solid fa-circle-info  button " title='Tag Info' onClick={handletaginfo}></i>

                <i class="fa-solid fa-layer-group spidControl button" title='Area Info' onClick={handleshowsavedlayer}></i>
                <i class="spidControl fa fa-search-plus button" title='Zoomin' onClick={handleZoomIn} ></i>
                <i class="spidControl fa fa-search-minus button" title='Zoomout' onClick={handleZoomOut} ></i>
                <i class="spidControl fa-solid fa-up-down-left-right button" title='Pan' onClick={handlepan}></i>
                <i class="spidControl fa-solid fa-down-left-and-up-right-to-center button" title='Fitview' onClick={handlefitview}></i>
                <i class="spidControl fa fa-upload button" title="Export" onClick={handleexportMenuone}></i>

                {exportmenuone && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: '2%',
                            backgroundColor: 'lightgray',
                            padding: '20px',
                            zIndex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            borderBlockColor: 'black',
                            color: 'black'
                        }}
                    >
                        {/* Close button */}
                        <button onClick={handlecloseexport}><i class="fa-solid fa-xmark"></i></button>

                        {/* Tag info */}
                        <ul style={{ listStyle: 'none' }}>
                            <li className='btn' onClick={handleexId}>Export Id</li>
                            <li className='btn' onClick={handleextext}>Export Text</li>
                        </ul>
                    </div>
                )}
                <i class="spidControl fa-solid fa-arrow-pointer button" title='Selection' onClick={handleselect}></i>
                <i class="spidControl fa-solid fa-square  button " title='Window Select' onClick={handlewindowselect}></i>
                <i class="spidControl fa fa-pencil button" title='Edit' onClick={handleeditpan} ></i>
            </div>}

            {isshowcanvas && <div className='right' id='spidEditPane' style={{ display: iscon2Visible ? 'block' : 'none', height: '100%', width: '11%' }}>
                {/* <h2>Window Select</h2> */}
                {/* <div id="spidSvgElems">
                    <img
                        id="spidLine" class="svgElem button" src="images/line.png" title="Line"
                    /><img
                        id="spidRect" class="svgElem button" src="images/rect.png" title="Rectangle"
                    /><img
                        id="spidPolygon" class="svgElem button" src="images/polygon.png" title="Polygon"
                    />
                </div> */}
                <div className='opt'>
                    {/* <i class="fa-solid fa-square svgElem button " title='window select' onClick={handlewindowselect}></i> */}
                    {/* <i class="fa-regular fa-square svgElem button " title='window interect' onClick={handlewindowinter}></i> */}
                </div>
                <h2>Tag Functions</h2>
                <div className='opt'>
                    <i className="fa-solid fa-tag svgElem button " title='Assign Tag' onClick={handleassigntag} ></i>

                </div>
                <h2>Area Functions</h2>
                <div className='opt'>
                    <i class="fa-solid fa-pen-to-square svgElem button" title='Draw Area' onClick={handledrawarea}></i>
                    <i class="fa-solid fa-a svgElem button" title='Assign Area' onClick={handleassignarea} ></i>
                </div>
                <h2>Flag Functons</h2>
                <div className='opt'>
                    <i class="fa-solid fa-arrows-turn-to-dots svgElem button" title='Flag assign' onClick={handleflagassign}></i>
                </div>


                <div id='exrightopt'>
                    <i class="spidControl fa-solid fa-circle-info  button " title='Tag Info' onClick={handletaginfo}></i>
                    <i class="fa-solid fa-layer-group spidControl button" title='Area Info' onClick={handleshowsavedlayer}></i>

                    <i class="spidControl fa fa-search-plus button" title='Zoom In' onClick={handleZoomIn}></i>
                    <i class="spidControl fa fa-search-minus button" title='Zoom Out' onClick={handleZoomOut}></i>
                    <i class="spidControl fa-solid fa-up-down-left-right button " title='Pan' onClick={handlepan}></i>
                    <i class="spidControl fa-solid fa-down-left-and-up-right-to-center button" title='Fit View' onClick={handlefitview}></i>
                    <i class="spidControl fa fa-upload button" title="Export" onClick={handleexportMenutwo}></i>
                    {exportmenutwo && (
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: '12%',
                                backgroundColor: 'lightgray',
                                padding: '20px',
                                zIndex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                borderBlockColor: 'black',
                                color: 'black'
                            }}
                        >
                            {/* Close button */}
                            <button onClick={handlecloseexport}><i class="fa-solid fa-xmark"></i></button>

                            {/* Tag info */}
                            <ul style={{ listStyle: 'none' }}>
                                <li className='btn' onClick={handleexId}>Export Id</li>
                                <li className='btn' onClick={handleextext}>Export Text</li>
                            </ul>
                        </div>
                    )}
                    <i class="spidControl fa-solid fa-arrow-pointer button" title='Selection' onClick={handleselect}></i>
                    <i class="spidControl fa-solid fa-square  button " title='window select' onClick={handlewindowselect}></i>
                    <i class="spidControl fa fa-pencil button" onClick={handlemineditpan}></i>
                </div>
            </div>}

            {istagreview &&
                <div className='tagtab ' style={{ width: isSideNavOpen ? '83.5%' : '100%', marginLeft: isSideNavOpen ? '16.5%' : '0%' }}>
                    {/* border border-1 border-info */}
                    <form >
                        <Table >
                            <thead>
                                <tr>
                                    <th id='taghead'>Tag number</th>
                                    <th id='taghead'>Name</th>
                                    <th id='taghead'>Type</th>
                                    <th id='taghead'>Model</th>
                                    <th id='taghead' >
                                        <i class="fa fa-download" title="Import tags" ></i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td> */}
                                </tr>
                            </tbody>
                        </Table>
                    </form>
                </div>}

            {istagreg && <div className='tagreg' style={{ width: isSideNavOpen ? '83.5%' : '100%', marginLeft: isSideNavOpen ? '16.5%' : '0%' }}>
                <div class="page dark">
                    <section class="page-section">

                        <h1 style={{ color: '#8C97F5' }}>Tag registration</h1>

                    </section>
                    <form >
                        <section class="page-section">
                            <div class="row">
                                <label className='mb-2' for="tagRegNumber">Tag number *</label>
                                <br />
                                <input onChange={(e) => setInputs(e)} type="text" id="tagRegNumber" name='tagno' class="page-input w-25 " maxlength="20"
                                    required />
                            </div>
                            <div class="row">
                                <label className='mb-2' for="tagRegName">Name</label>
                                <br />
                                <input onChange={(e) => setInputs(e)} type="text" id="tagRegName" name='tname' class="page-input w-25" maxlength="100" />
                            </div>
                            <div class="row">
                                <label className='mb-2' for="tagRegType">Type *</label>
                                <br />
                                {/* <select id="tagRegType" class="page-input w-25" required>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select> */}

                                <select class="form-select w-25 " id="inputGroupSelect01" name='ttype' onChange={(e) => setInputs(e)}>
                                    <option selected>Choose...</option>
                                    <option value="Line">Line</option>
                                    <option value="Equipment">Equipment</option>
                                    <option value="Valve">Valve</option>
                                    <option value="Structural">Structural</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            {/* <div class="row">
                                <label for="tagRegModelFile">Model</label>
                                <br />
                                <input type="file" id="tagRegModelFile" class="page-input" />
                                <br />
                                <input type="checkbox" id="tagRegModelZUp" />
                                <label for="tagRegModelZUp">Use Z-up</label>
                            </div> */}
                        </section>
                        <button type='button' onClick={(e) => handleReg(e)}>Register</button>
                    </form>
                </div>
            </div>}

            {isequlist && <div className='equtab' style={{ width: isSideNavOpen ? '83.5%' : '100%', marginLeft: isSideNavOpen ? '16.5%' : '0%' }} >
                {/* border border-1 border-info */}
                <form >
                    <Table >
                        <thead>
                            <tr >
                                <th id='equhead'>Tag</th>
                                <th id='equhead'>Description</th>
                                <th id='equhead'>Quantity</th>
                                <th id='equhead'>Capacity (%)</th>
                                <th id='equhead'>Equipment type</th>
                                <th id='equhead'>Materials</th>
                                <th id='equhead'>Capacity/duty</th>
                                <th id='equhead'>Dimensions - ID x TT or L x W x H (mm)</th>
                                <th id='equhead'>Design pressure</th>
                                <th id='equhead'>Operating pressure</th>
                                <th id='equhead'>Design temperature</th>
                                <th id='equhead'>Operating temperature</th>
                                <th id='equhead'>Dry weight</th>
                                <th id='equhead'>Operating weight</th>
                                <th id='equhead'>Supplier</th>
                                <th id='equhead'>Remarks</th>
                                <th id='equhead'>Initial status</th>
                                <th id='equhead'>Revision</th>
                                <th id='equhead'>Revision date</th>
                                <th id='equhead'>
                                    <i class="fa fa-upload" title="Export" ></i>
                                    <i class="fa fa-download" title="Import" ></i>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>44</td> */}
                            </tr>
                        </tbody>
                    </Table>
                </form>
            </div>}

            {islinelist && <div className='linetab ' style={{ width: isSideNavOpen ? '83.5%' : '100%', marginLeft: isSideNavOpen ? '16.5%' : '0%' }}>
                {/* border border-1 border-info */}
                <form >
                    <Table >
                        <thead>
                            <tr >
                                <th id='linehead' >Tag</th>
                                <th id='linehead'>Fluid code</th>
                                <th id='linehead'>Line ID</th>
                                <th id='linehead'>Medium</th>
                                <th id='linehead'>Line size (inch)</th>
                                <th id='linehead'>Line size (NB)</th>
                                <th id='linehead'>Piping spec.</th>
                                <th id='linehead'>Insulation type</th>
                                <th id='linehead'>Insulation thickness</th>
                                <th id='linehead'>Heat tracing</th>
                                <th id='linehead'>Line from</th>
                                <th id='linehead'>Line to</th>
                                <th id='linehead'>Maximum operating pressure (bar)</th>
                                <th id='linehead'>Maximum operating tempertature (ºC)</th>
                                <th id='linehead'>Design pressure (bar)</th>
                                <th id='linehead'>Minimum design tempertature (ºC)</th>
                                <th id='linehead'>Maximum design tempertature (ºC)</th>
                                <th id='linehead'>Test pressure (bar)</th>
                                <th id='linehead'>Test medium</th>
                                <th id='linehead'>Test medium phase</th>
                                <th id='linehead'>Mass flow (kg/hr)</th>
                                <th id='linehead'>Volume flow (m<sup>3</sup>/hr)</th>
                                <th id='linehead'>Density (kg/m<sup>3</sup>)</th>
                                <th id='linehead'>Velocity (m/s)</th>
                                <th id='linehead'>Paint system</th>
                                <th id='linehead'>NDT group</th>
                                <th id='linehead'>Chemical cleaning</th>
                                <th id='linehead'>PWHT</th>
                                <th id='linehead' class="tableActionCell" >
                                    <i class="fa fa-upload" title="Export" ></i>
                                    <i class="fa fa-download" title="Import" ></i>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>44</td> */}
                            </tr>
                        </tbody>
                    </Table>
                </form>
            </div>}

            {isdocreview &&
                <div className='doctab' style={{ width: isSideNavOpen ? '83.5%' : '100%', marginLeft: isSideNavOpen ? '16.5%' : '0%' }}>
                    {/* border border-1 border-info */}
                    <form >
                        <Table >
                            <thead>
                                <tr>
                                    <th id='dochead'>Document number</th>
                                    <th id='dochead'>Title</th>
                                    <th id='dochead'>Description</th>
                                    <th id='dochead'>Type</th>
                                    <th id='dochead'>File</th>
                                    <th id='dochead'>
                                        <i class="fa fa-download" title="Import documents" ></i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td> */}
                                </tr>
                            </tbody>
                        </Table>
                    </form>
                </div>}

            {isdocreg && <div className='docreg' style={{ width: isSideNavOpen ? '83.5%' : '100%', marginLeft: isSideNavOpen ? '16.5%' : '0%' }}>
                <div class="page dark">
                    <section class="page-section">

                        <h1 style={{ color: '#8C97F5' }}>Document registration</h1>

                    </section>
                    <form >
                        <section class="page-section">
                            <div class="row">
                                <label className='mb-2' for="docRegNumber">Document number *</label>
                                <br />
                                <input onChange={(e) => handledInputs(e)} name='docno' type="text" id="docRegNumber" class="page-input w-25" maxlength="20"
                                    required />
                            </div>
                            <div class="row">
                                <label className='mb-2' for="docRegTitle">Title</label>
                                <br />
                                <input onChange={(e) => handledInputs(e)} name='title' type="text" id="docRegTitle" class="page-input w-25" maxlength="100" />
                            </div>
                            <div class="row">
                                <label className='mb-2' for="docRegDescr">Description</label>
                                <br />
                                <textarea onChange={(e) => handledInputs(e)} id="docRegDescr" name='des' class="page-input-long w-25" ></textarea>
                            </div>
                            {/* <div class="row">
                                <label className='mb-2' for="docRegType">Type *</label>
                                <br />
                                <select id="docRegType" class="page-input " required>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div> */}
                            <div class="row">
                                <label className='mb-2' for="docRegFile">Model file</label>
                                <br />
                                <input type="file" id="docRegFile" class="page-input" onChange={handledocadd} />
                            </div>
                            <div class="row">
                                <label className='mb-2' for="DCRegType">Type *</label>
                                <br />
                                {/* <select id="tagRegType" class="page-input w-25" required>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select> */}

                                <select onChange={(e) => handledInputs(e)} class="form-select w-25 " id="inputGroupSelect02" name='dtype'>
                                    {/* (e) => handledInputs(e) */}
                                    <option selected>Choose...</option>
                                    {doctype.map((item, index) => (
                                        <option key={index} value={item.name}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </section>
                        <button type='button' onClick={(e) => handledocReg(e)}>Register</button>
                    </form>
                </div>
            </div>}



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicdno">

                            <Form.Control name="dno" type="text" placeholder="Enter drawing no" />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicdna">

                            <Form.Control name="dname" type="text" placeholder="Enter drawing name" />

                        </Form.Group>
                        <Form.Group className='mb-3' controlId='formbasicdfi'></Form.Group>
                        <Form.Control name='dfi' type='file' onChange={handleFileChange}   ></Form.Control>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={tagassishow} onHide={handletagassiClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Tag</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center mb-5'>
                        <p>Select Tag</p>
                        <select value={tagid} onChange={handleChange}>
                            <option value="">Select:-</option>
                            {isassitaglist.map((i) => (
                                <option key={i.tagno} value={i.tagno}>
                                    {i.tagno}
                                </option>
                            ))}
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handletagassiClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => handleeletagassign(e)}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={taginfoshow} onHide={handletaginfoClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tag informaton</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {Object.entries(tabledetail).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handletaginfoClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary" onClick={handletaginfoClose}>
                        Save Changes
                    </Button> */}
                </Modal.Footer>
            </Modal>

            <Modal show={areaassishow} onHide={handleareaassiclose}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Area</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center mb-5'>
                        <p>Select Areaid</p>
                        <select value={Areaid} onChange={handleareachange}>
                            <option value="">Select:-</option>
                            {areaoption.map((i) => (
                                <option key={i.Areaid} value={i.Areaid}>
                                    {i.Areaid}
                                </option>
                            ))}
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleareaassiclose}>
                        Close
                    </Button>
                    <Button variant="primary" type='button' onClick={(e) => handlesavelayer(e)} >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={flagassishow} onHide={handleflagassiClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Flag Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center mb-5'>
                        <p>Select Flag</p>
                        <select value={flagSelectedValue} onChange={handleflagChange}>
                            <option value="">Select:-</option>
                            {isareadetail.map((i) => (
                                <option key={i.Flagname} value={i.Flagname}>
                                    {i.Flagname}
                                </option>
                            ))}
                        </select>

                        <p>Select Connecting file</p>
                        {/* <select value={flagcdocname} onChange={handleflagcdocChange}>
                            <option value="">Select:-</option>
                            {isdocnames.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select> */}
                        <select value={flagcdocname} onChange={handleflagcdocChange}>
                            <option value="">Select:-</option>
                            {isdocnames.map((item) => {
                                // Use a JavaScript block to contain the conditional logic
                                if (item !== filename) {
                                    return (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    );
                                } else {
                                    return null; // Exclude the option
                                }
                            })}
                        </select>
                        {/* <p>Select Tag</p>
                        <select value={tagid} onChange={handleChange}>
                            <option value="">Select:-</option>
                            {isassitaglist.map((i) => (
                                <option key={i.tagno} value={i.tagno}>
                                    {i.tagno}
                                </option>
                            ))}
                        </select> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleflagassiClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleflagassidetails}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>



        </div>
    )
}

export default Home