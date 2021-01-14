const getTranslateValues = element => {
    const style = window.getComputedStyle(element)
    const matrix = style.transform

    if (matrix === 'none') {
        return {
            x: 0,
            y: 0,
            z: 0
        }
    }

    const matrixType = matrix.includes('3d') ? '3d' : '2d'
    const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')

    if (matrixType === '2d') {
        return {
            x: matrixValues[4],
            y: matrixValues[5],
            z: 0
        }
    }

    if (matrixType === '3d') {
        return {
            x: matrixValues[12],
            y: matrixValues[13],
            z: matrixValues[14]
        }
    }
}

export default getTranslateValues;