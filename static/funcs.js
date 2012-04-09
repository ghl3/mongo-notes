
{
    $(function() {
        $('a#add_item').bind('click', function() {
            $.getJSON($SCRIPT_ROOT + '/_add_item', {
                item_name: $('textarea[name="item_name"]').val()
            },
                      function(data) {
                          $("#result").text(data.result);
                      });
            return false;
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
