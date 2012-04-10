
{
    $(function() {
        $('a#add_item').bind('click', function() {
            $.getJSON($SCRIPT_ROOT + '/_add_item', {
                item_name: $("#main_input").val()
            },
                      function(data) {
                          $("#result").text(data.result);
                      });
            return false;
        });
    });

    $("a.edit_item").live("click", function() {
        $.getJSON($SCRIPT_ROOT + '/_get_item_card', {
            item_id: this.id
        },
                  function(data) {
                      $("#main_input").val(data.result);
                  });
    });

    $("a.rm_item").live("click", function() {
        alert("removing " + this.id)
        $.getJSON($SCRIPT_ROOT + '/_rm_item', {
            item_id: this.id
        },
                  function(data) {
                      $("#result").html(data.result);
                  });
    });

    $(function() {
        $('a#get_collections').bind('click', function() {
            $.getJSON($SCRIPT_ROOT + '/_get_collections', { },
                      function(data) {
                          $("#result").html(data.result);
                      });
            return false;
        });
    });

    $(function() {
        $('a#clear_db').bind('click', function() {
            $.getJSON($SCRIPT_ROOT + '/_clear_db', { },
                      function(data) {
                          $("#result").html(data.result);
                      });
            return false;
        });
    });

    $("li.collection_heading").live("click", function() {
        $.getJSON($SCRIPT_ROOT + '/_get_items', {
            collection_name: this.innerText
        },
                  function(data) {
                      $("#result").html(data.result);
                  });
    });

    $("li.item_listing").live("click", function() {
        $.getJSON($SCRIPT_ROOT + '/_get_item_detail', {
            item_id: this.id
        },
                  function(data) {
                      $("#result").html(data.result);
                  });
    });
}

