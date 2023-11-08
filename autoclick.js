const collection = document.getElementsByClassName("islib");
console.log(collection.length);
let imageLinkList = [];
const collectionLength = collection.length;

for (let i = 0; i < collectionLength; ++i) {
	((idx) => {
		setTimeout(() => {
			collection[idx].click();
		}, idx*1000)
		setTimeout(() => {
			const parsedURL = new URL(collection[idx].href);
			imageLinkList.push(parsedURL.searchParams.get("imgurl"));
		}, (idx+1)*1000)
	})(i)
}

// https://www.google.com/search?q=horse&tbm=isch
