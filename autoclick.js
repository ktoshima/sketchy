const collection = document.getElementsByClassName("islib");
console.log(collection.length);

// const collectionLength = collection.length;
const collectionLength = 10;
let promises = [];
for (let i = 0; i < collectionLength; ++i) {
	collection[i].click();
	let imgUrlPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			if (collection[i].hasAttribute('href')) {
				const parsedURL = new URL(collection[i].href);
				resolve(parsedURL.searchParams.get("imgurl"));
			} else {
				reject("imgurl not found in HTMLElement");
			}
		}, (i+1)*1000);
	});
	imgUrlPromise.then((imgurl) => {
		promises.push(new Promise((resolve, reject) => {
			setTimeout(() => {
				imgObject = {id: i, imgurl: imgurl};
				console.log(imgObject)
				resolve(imgObject);
			}, (i+2)*1000);
		}));
		console.log(promises);
	});
}
Promise.all(promises).then((imgUrlList) => { console.log(imgUrlList); });

// for (let i = 0; i < collectionLength; ++i) {
// 	((idx) => {
// 		setTimeout(() => {
// 			collection[idx].click();
// 		}, idx*1000)
// 		setTimeout(() => {
// 			const parsedURL = new URL(collection[idx].href);
// 			imageLinkList.push({'id': idx, 'imgurl': parsedURL.searchParams.get("imgurl")});
// 		}, (idx+1)*1000)
// 	})(i)
// }

// https://www.google.com/search?q=horse&tbm=isch
