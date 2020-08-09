/**
 * Project: rottweiler
 * Description: Central authentication and authorization system for Tailbuds Pvt Ltd.
 * Copyright (C) 2020 Tailbuds Private Limited. All Rights Reserved.
 * Authors: AK Hanish <akhanish7@gmail.com>, Revanth Nemani <revanth@tailbuds.com> and Richa Tiwary <richatiwary1911@gmail.com>
 * Inquiry and support: dev@tailbuds.com
 */

exports.get404 = (req, res, next) => {
  console.log(req);
  res.status(404).json('not found');
};
