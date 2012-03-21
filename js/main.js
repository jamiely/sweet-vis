$(function() {
  var getSelectedDataSource = function() {
    return $('input[name=data_source]:checked');
  };
  // Update the data source depending on what has been selected in the
  // radio boxes.
  var updateDataSource = function() {
    var selected = getSelectedDataSource().val();
    window.selectDataSource(selected);
    console.log("Changed data source to: " + selected);
  };

  if(getSelectedDataSource().empty()) {
    $('input[name=data_source]:first').prop('checked', true);
  }
  updateDataSource();
});
