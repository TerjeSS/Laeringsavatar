Læringsavatar HK-dir project.
https://laeringsavatar.khio.no/

Technologies and Frameworks:
- JavaScript, with React for UI
- Firebase for database
- Three.js for visualization

The web app contains two main pages: one for 3D visualization of an animation sequence and one for managing the visualizations for a user. Additionally, we have login pages, an information page (landing page), and a help page. The visualization page is open to everyone and does not require login. The management page requires login. A new user can be created from the start page, and a standard user will then be created. Such a standard user can upload visualizations and view their own visualizations from the management page. We also have some superusers who can see all visualizations from their management page.

A 3D visualization is stored in a file of the type gltf. Gltf is a file format for 3D visualizations primarily made for web applications. In this application, these files come from motion capture recordings and are manually created by an expert in 3D modeling. The files are made with Blender.

Functionalities of the Visualization Page:
- For the visualization to work, the model must be "rigged" with a motion capture system. The visualization page assumes the following structure on the rig: "mannequin_skeleton" represents the skeleton; "Glasses_Square" represents the glasses; "Track_pants" is the model for the pants; "mannequin" is the model for the figure; "Hips" is the root node of the legs containing the animation sequence from the motion capture recording.
- The visualization page assumes that the model contains an animation sequence. This animation starts automatically when the page starts and can be played with the buttons at the top of the page with pause/start/forward/backward. The forward/backward buttons stop the animation and move the animation one step forward or backward.
- The user can navigate with various controllers in the 3D environment with a camera. This camera can be moved with mouse or touch-screen gestures. The camera moves around and over the figure, so the figure is always in focus (with an orbit camera model). The user can choose whether to focus on the movements (the body) or where in the room the movements take place (e.g., in bird's-eye view to see movement and directions, or from the side to see at what level the movements take place).
- The camera rotates around the hips initially. Depending on the movement, the user may want to focus on other areas than this in the movement, such as zooming in on the feet. The user can click on the figure to select the area the camera should focus on. If the user clicks on the feet, a small red ball blinks on this area for 250 milliseconds to show what the user clicked on. This area will then represent the focus of the camera, and the user will now be able to zoom in on and rotate around the feet.
- The figure moves exclusively within the scene. This scene is a square of 25 m², and the motion capture recordings are thus limited to an area of 5 meters. The scene has markers and colors that clarify directions. Camera movements are also limited to this area so that the user does not zoom outside the scene.
- In addition to the central functions described above, the visualization contains various user options such as sound/music and changing the appearance of the figure from a menu on the side.
- These functions are designed with different devices in mind and have been tested on PC, laptop, iPhones, Samsung smartphones, and iPad. Color choices follow principles of universal design.
