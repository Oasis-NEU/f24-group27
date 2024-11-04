// src/utils/supabaseCRUD.js
import supabase from '../config/supabaseClient'; // Default import, no curly braces

// CRUD functions
export const createRecord = async (table, data) => {
  const { data: createdData, error } = await supabase.from(table).insert([data]);
  if (error) {
    console.error('Error creating record:', error);
    return null;
  }
  return createdData;
};

export const readRecords = async (table, filter = {}) => {
  const { data, error } = await supabase.from(table).select('*').match(filter);
  if (error) {
    console.error('Error reading records:', error);
    return null;
  }
  return data;
};

export const updateRecord = async (table, id, updatedData) => {
  const { data, error } = await supabase.from(table).update(updatedData).match({ id });
  if (error) {
    console.error('Error updating record:', error);
    return null;
  }
  return data;
};

export const deleteRecord = async (table, id) => {
  const { data, error } = await supabase.from(table).delete().match({ id });
  if (error) {
    console.error('Error deleting record:', error);
    return null;
  }
  return data;
};
