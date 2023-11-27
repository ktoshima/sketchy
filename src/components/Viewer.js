

const Viewer = ({ viewObject }) => {

	return (
		<>
			{viewObject && viewObject.type === 'interval' &&
				<div> {viewObject.message} </div>
			}
			{viewObject && viewObject.type === 'drawing' &&
				<>
					<div> Drawing #{viewObject.drawingNum}/{viewObject.outof} </div>
					<img src={viewObject.img.imgurl} alt="" max-width='1200px' max-height="400px"/>
				</>
			}
		</>
	)
}

export default Viewer;
