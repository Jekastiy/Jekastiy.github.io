let app = new Vue({
    el: '#app',
    data: {
        authors: [
            { email: 'egeneavdeev2013@gmail.com' },
            { email: 'egor.domozhirov@gmail.com' }
        ],
        startButtonCaption: 'Start game',
        upgradeButtonCaption: 'Upgrade'
    },
    methods: {
        goGameView: () => {
            document.location = 'game.html'
        },
        goUpgradeView: () => {
            document.location = 'upgrade.html'
        }
    }
})