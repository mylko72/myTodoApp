var storage = localStorage,
    getLists = function(){
      return JSON.parse(storage.getItem("todoList")) || [];
    },
    appendList = function(list){
      var lists = getLists();
      lists.push(list);
      storage.setItem("todoList", JSON.stringify(lists));
    },
    updateList = function(lists){
      storage.removeItem("todoList");
      storage.setItem("todoList", JSON.stringify(lists));
    };

export { storage, getLists, appendList, updateList }
