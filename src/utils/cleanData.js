'use strict';
/**
 * Cleans unwanted values (undefined, null) of a 2D Array.
 * @param {Array} dataSet - 2D Array of mixed values.
 * @returns {Array} dataSet with cleaned values.
 */
const cleanData = function(dataSet) {
  let cleanedDataSet = [];
  dataSet.forEach((row) => {
    const cleanedRow = cleanRow(row);
    cleanedDataSet.push(cleanedRow);
  });
  return cleanedDataSet;
};

  const cleanRow = function(row) {
    let cleanedRow = [];
    row.forEach((element) => {
      element = cleanElement(element);
      cleanedRow.push(element);
    });
    return cleanedRow;
  };

    const cleanElement = function(element) {
      if(element === undefined || element === null) return '';
      return element;
    };

module.exports = cleanData;
