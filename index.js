
// create an engine
let engine = Matter.Engine.create();

// create a renderer
let render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1300,
        height: 640,
        wireframes: false
    }
});

// create two boxes and a ground


// let boxA = Bodies.rectangle(400, 200, 80, 80);
// let boxB = Bodies.rectangle(350, 50, 80, 80);

let mouse = Matter.Mouse.create(render.canavas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false },

    }
})
render.mouse = mouse;

let ground1 = Matter.Bodies.rectangle(1050, 300, 300, 20, { isStatic: true });
let stack1 = Matter.Composites.stack(950, 50, 4, 4, 0, 0, (x, y) => {
    // return Matter.Bodies.rectangle(x, y, 80, 80);
    // let sides = Math.random(Matter.Common.random(2, 8));
    // return Matter.Bodies.polygon(x, y, sides, Matter.Common.random(20, 50));
    return Matter.Bodies.polygon(x, y, 8, 30);
})

let ground2 = Matter.Bodies.rectangle(750, 580, 300, 20, { isStatic: true });
let stack2 = Matter.Composites.stack(650, 20, 4, 4, 0, 0, (x, y) => {
    return Matter.Bodies.polygon(x, y, 4, 30);
})


let xBall = 150, yBall = 200;
let ball = Matter.Bodies.circle(xBall, yBall, 20);
let sling = Matter.Constraint.create({
    pointA: { x: xBall, y: yBall },
    bodyB: ball,
    stiffness: 0.05
})


//Events
let firing = false;
Matter.Events.on(mouseConstraint, "enddrag", (e) => {
    if (e.body === ball)
        firing = true;// ie.e if the firing object is ball then set firing to true
})
Matter.Events.on(engine, 'afterUpdate', () => {
    if (firing &&
        Math.abs(ball.position.x - xBall) < 20 &&
        Math.abs(ball.position.y - yBall) < 20
    ) {

        ball = Matter.Bodies.circle(xBall, yBall, 20);

        Matter.World.add(engine.world, ball);

        sling.bodyB = ball;
        firing = false;
    }
})

// add all of the bodies to the world
Matter.World.add(engine.world, [ball, sling, stack1, stack2, ground1, ground2, mouseConstraint]);

// run the engine
Matter.Engine.run(engine);

// run the renderer
Matter.Render.run(render);
