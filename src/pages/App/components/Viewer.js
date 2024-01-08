

const Viewer = ({ viewObject }) => {

	return (
		<div id="viewer">
			{viewObject && viewObject.type === 'interval' &&
				<div id="viewer-message"> {viewObject.message} </div>
			}
			{viewObject && viewObject.type === 'drawing' &&
				<>
					{/* <div> Drawing #{viewObject.drawingNum}/{viewObject.outof} </div> */}
					<div id="viewer-image">
						<img src={viewObject.img.imgurl} alt={viewObject.img.imgurl}/>
					</div>
				</>
			}
		</div>
	)
}

export default Viewer;
