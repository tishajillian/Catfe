// CAROUSEL START //

const images = document.querySelector(".home-promo .image-slider .images"),
firstImage = images.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".home-promo .image-slider i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    let scrollWidth = images.scrollWidth - images.clientWidth;
    arrowIcons[0].style.display = images.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = images.scrollLeft == scrollWidth ? "none" : "block";
    
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImageWidth = firstImage.clientWidth + 14;
        images.scrollLeft += icon.id == "left" ? -firstImageWidth : firstImageWidth;
        setTimeout(() => showHideIcons(),60);
    })
})

const autoSlide = () => {
if(images.scrollLeft == (images.scrollWidth - images.clientWidth)) return; 

    positionDiff = Math.abs(positionDiff);
    let firstImageWidth = firstImage.clientWidth + 14;
    let valDiff = firstImageWidth - positionDiff;

    if(images.scrollLeft > prevScrollLeft){
        return images.scrollLeft += positionDiff > firstImageWidth / 3 ? valDiff : -positionDiff;
    }
    images.scrollLeft -= positionDiff > firstImageWidth / 3 ? valDiff : -positionDiff;

}

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = images.scrollLeft;
}

const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    images.classList.add("dragging");
    positionDiff = e.pageX - prevPageX;
    images.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = (e) => {
    isDragStart = false;
    images.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

images.addEventListener("mousedown", dragStart);
images.addEventListener("mousemove", dragging);
images.addEventListener("mouseup", dragStop);
images.addEventListener("mouseleave", dragStop);

// CAROUSEL ENDS //