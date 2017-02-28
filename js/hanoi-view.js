class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.render();
    this.bindEvents();
    this.firstMove = null;
  }

  bindEvents(){
    $('ul').on('click', e => {
      let $tower = $(e.currentTarget);
      this.clickTower($tower);
    });
  }

  setupTowers() {
    for (let i = 0; i < 3; i++) {
      let $pile = $("<ul></ul>");
      let disk = "<li></li>";
      for (let j = 0; j < 3; j++) {
        $(disk).appendTo($pile);
      }
      $pile.data("tower", i);
      this.$el.append($pile);
    }
  }

  render() {
    let $lItems = $('.hanoi li');
    $lItems.each((i) => {
      let tower = Math.floor(i / 3);
      let disk = 2 - (i % 3);
      let val = this.game.towers[tower][disk];
      if (val) {
        $($lItems[i]).addClass(`disk-${val}`);
      } else {
        $($lItems[i]).removeClass(`disk-1 disk-2 disk-3`);
      }
    });
  }

  clickTower($tower) {
    if (this.firstMove !== null) {
      let end = $tower.data("tower");
      if (this.game.move(this.firstMove, end)) {
        // PLACEHOLDER
      } else {
        alert("BOO!");
      }
      this.firstMove = null;
      $(".hanoi ul").removeClass("selected");
    } else {
      this.firstMove = $tower.data("tower");
      $tower.addClass("selected");
    }
    this.render();
    if (this.game.isWon()) {
      alert('You Win!');
      $('ul').off("click");
      $(this.$el).addClass('game-over');
    }
  }
}

module.exports = View;
