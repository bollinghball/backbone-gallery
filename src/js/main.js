var imageGall = [
    {
        image: 'images/wave1.jpg',
        likes: 0
    },
    {
        image: 'images/wave2.jpg',
        likes: 0
    },

    {
        image: 'images/wave3.jpeg',
        likes: 0
    },

    {
        image: 'images/wave4.jpg',
        likes: 0
    },

    {
        image: 'images/wave5.jpg',
        likes: 0
    }
];

var collection = new Backbone.Collection(imageGall);

var firstInput = $('#add');

firstInput.on('keyup', function (e) {
    if (e.keyCode === 13) {
        collection.add({
            image: firstInput.val(),
            likes: 0
        });
        firstInput.val('');
    }
});

function AppView (collection) {
    var _this = this;
    this.el = $('<div></div>', {
        class: 'app'
    });
    this.collection = collection;
    this.collection.on('add remove', this.render.bind(this));
}

AppView.prototype.render = function () {
    var _this = this;

    this.el.empty();

    this.collection.each(function (model) {
        var pictureView = new PictureView(model);
        pictureView.render();
        _this.el.append(pictureView.el)
    });
}

function PictureView (model) {
    this.el = $('<div></div>')
    this.model = model;
    model.on("change", this.render.bind(this));
}

PictureView.prototype.render = function () {
    var _this = this;
    this.el.html(`
            <img src="${this.model.get('image')}">
            <label class="likesLabel">Likes:</label>
            <button class="likes">${this.model.get('likes')}</button>
            <button class="delete">Delete</button>
        `);

    var likesButton = this.el.find('button.likes');

    likesButton.on('click', function() {
        _this.model.set('likes', _this.model.get('likes') + 1);
    });

    var deleteButton = this.el.find('button.delete');
    deleteButton.on('click', function() {
        _this.model.destroy();
    }); 

}

var appView = new AppView(collection);

appView.render();

$(document.body).append(appView.el);