
const clickPromise = (htmlElement, timeout) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			htmlElement.click();
			resolve();
		}, timeout);
	});
};

const imgUrlPromise = (id, htmlElement) => {
	return new Promise((resolve) => {
		if (htmlElement.hasAttribute('href')) {
			const parsedURL = new URL(htmlElement.href);
			resolve({id: id, imgurl: parsedURL.searchParams.get('imgurl')});
		}
		const observer = new MutationObserver(_mutations => {
			if (htmlElement.hasAttribute('href')) {
				observer.disconnect();
				const parsedURL = new URL(htmlElement.href);
				resolve({id: id, imgurl: parsedURL.searchParams.get('imgurl')});
			}
		});
		observer.observe(htmlElement, {attributeFilter: ['href']});
	});
}

const getImgUrlObj = (id, htmlElement, timeout) => {
	return clickPromise(htmlElement, timeout)
		.then(() => {
			return imgUrlPromise(id, htmlElement);
		});
}

const tmbHtmlCollection = document.getElementsByClassName("islib");
const htmlArray = [];
let counter = 0
for (let key in tmbHtmlCollection) {
	htmlArray.push(tmbHtmlCollection[key]);
	++counter;
	if (counter === 10) break;
}

Promise.all(htmlArray.map((value, index) => getImgUrlObj(index, value, index*1000) ))
	.then(array => array);