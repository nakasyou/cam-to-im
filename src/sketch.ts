import type p5 from 'p5'
let capture: p5.Element

export const setup = () => {
  // Setup code
  createCanvas(640, 480)

  capture = createCapture(
    // @ts-ignore VIDEO is not defined
    VIDEO
  )

  frameRate(2)
}

export const data = {
  x: 1
}

const getRGB = (x: number, y: number) => {
  const got = get(x, y)
  return {
    r: red(got),
    g: green(got),
    b: blue(got)
  }
}
export const draw = () => {
  // Draw code
  background('blue')

  if (!capture) {
    return
  }
  /*
  const captureCanvas = capture.get().canvas as HTMLCanvasElement
  const imageData = captureCanvas.getContext('2d')!.getImageData(0, 0, captureCanvas.width, captureCanvas.height)
  console.log(imageData)*/
  image(capture.get(), 0, 0)

  let rectI = 0
  for (const RECT of [40, 80, 160]) {
    for (let x = 0; x < width; x += RECT) {
      for (let y = 0; y < height; y += RECT) {
        if (Math.random() < 0.5 && rectI !== 0) {
          continue
        }
        noStroke()
        fill(0, 0, 0)
    rect(x, y, RECT, RECT)

        const shape = Math.random()
        const { r, g, b } = getRGB(x + RECT / 2, y + RECT / 2)
        fill(r, g, b)

        if (shape < 0.3 || rectI === 0) {
          // Rect
          rect(x, y, RECT, RECT)
        } else if (shape < 0.6){
          // 直角三角形
          triangle(x, y, x + RECT, y, x, y + RECT)
        } else {
          // Circle
          circle(x, y, RECT / 2)
        }
      }
    }
    rectI ++
  }
}
