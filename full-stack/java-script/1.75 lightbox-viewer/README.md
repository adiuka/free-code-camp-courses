#Lightbox viewer

A lightbox is used on websites to showcase multimedia content in a more engaging way through use of a popup or modal window over the page's main content.

In this lab, you will create a lightbox gallery that displays full-size images when a thumbnail is clicked. For each image, two versions are provided: a thumbnail and a full-size image. The full-size image is the same as the thumbnail, but without the -thumbnail suffix.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

1. You should have a div with a class of gallery within your body.

2. Within the .gallery element, you should have three image thumbnails, each with a class of gallery-item. You should use the following links for thumbnail images:

https://cdn.freecodecamp.org/curriculum/labs/stonehenge-thumbnail.jpg
https://cdn.freecodecamp.org/curriculum/labs/storm-thumbnail.jpg
https://cdn.freecodecamp.org/curriculum/labs/trees-thumbnail.jpg

3. You should have a div with a class of lightbox within your body.

4. You should have a button with an id of close-btn within your .lightbox element. You can use &times; as its text if you want.

5. You should have a img with an id of lightbox-image within your .lightbox element.

6. Your .lightbox element should have a fixed position so that the preview opens on top of the current images.

7. Your .lightbox element should cover the entire viewport by setting the height and width to 100% of the container. You should ensure that the .lightbox element starts at the top left corner of the container.

8. .lightbox should have a background color. Initially, its display property should be set to none to hide it.

9. When you click one of your .gallery-item elements, the .lightbox element's display property should be set to flex to make the .lightbox element and the two elements within it visible.

10. When you click one of your .gallery-item elements, the #lightbox-image element's src should be set to a full-size version of the image clicked by removing -thumbnail from the image's src attribute. The full-size images are located at the following links:

https://cdn.freecodecamp.org/curriculum/labs/stonehenge.jpg
https://cdn.freecodecamp.org/curriculum/labs/storm.jpg
https://cdn.freecodecamp.org/curriculum/labs/trees.jpg

11. When your .lightbox element is visible and you click the #close-btn or the .lightbox element, the .lightbox element's display should be set back to none.


