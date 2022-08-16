class Score {
    constructor() {
        this.value = 0
    }

    getValue() {
        return this.value
    }

    getAsString() {
        return 'Счет: ' + this.value
    }

    add(count = 1) {
        this.value += count
    }

    reset() {
        this.value = 0
    }
}