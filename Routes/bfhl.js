const express = require('express');
const router = express.Router();
const { fibonacci, lcm, hcf,isPrime } = require('../utils/math');
const { askGemini } = require('../utils/ai');


router.post('/bfhl', async (req, res) => {
  const OFFICIAL_EMAIL = req.app.locals.OFFICIAL_EMAIL;

  try {
    const body = req.body;

    if (body.fibonacci !== undefined) {
      const n = body.fibonacci;

      if (!Number.isInteger(n) || n <= 0) {
        return res.status(400).json({
          is_success: false,
          official_email: OFFICIAL_EMAIL,
          data: null,
          error: '"fibonacci" must be a positive integer'
        });
      }

      const series = fibonacci(n);
      return res.status(200).json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: series
      });
    }

    if (body.prime !== undefined) {
      const arr = body.prime;

      if (!Array.isArray(arr)) {
        return res.status(400).json({
          is_success: false,
          official_email: OFFICIAL_EMAIL,
          data: null,
          error: '"prime" must be an array of integers'
        });
      }

      const primeNumbers = arr.filter((num) => {
        const parsed = typeof num === 'string' ? Number(num) : num;
        return isPrime(parsed);
      });

      return res.status(200).json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: primeNumbers
      });
    }

    if (body.lcm !== undefined) {
      const arr = body.lcm;

      if (!Array.isArray(arr) || arr.length === 0) {
        return res.status(400).json({
          is_success: false,
          official_email: OFFICIAL_EMAIL,
          data: null,
          error: '"lcm" must be a non-empty array of integers'
        });
      }

      if (!arr.every(Number.isInteger)) {
        return res.status(400).json({
          is_success: false,
          official_email: OFFICIAL_EMAIL,
          data: null,
          error: 'All elements in "lcm" must be integers'
        });
      }

      const result = lcm(arr);
      return res.status(200).json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: result
      });
    }

    if (body.hcf !== undefined) {
      const arr = body.hcf;

      if (!Array.isArray(arr) || arr.length === 0) {
        return res.status(400).json({
          is_success: false,
          official_email: OFFICIAL_EMAIL,
          data: null,
          error: '"hcf" must be a non-empty array of integers'
        });
      }

      if (!arr.every(Number.isInteger)) {
        return res.status(400).json({
          is_success: false,
          official_email: OFFICIAL_EMAIL,
          data: null,
          error: 'All elements in "hcf" must be integers'
        });
      }

      const result = hcf(arr);
      return res.status(200).json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: result
      });
    }

    if (body.AI !== undefined) {
      const question = body.AI;

      if (typeof question !== 'string' || question.trim().length === 0) {
        return res.status(400).json({
          is_success: false,
          official_email: OFFICIAL_EMAIL,
          data: null,
          error: '"AI" must be a non-empty string question'
        });
      }

      const answer = await askGemini(question);

      return res.status(200).json({
        is_success: true,
        official_email: OFFICIAL_EMAIL,
        data: answer
      });
    }

    return res.status(400).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL,
      data: null,
      error: 'Request body must contain one of: "fibonacci", "prime", "lcm", "hcf", or "AI"'
    });

  } catch (error) {

    if (error.status === 429) {
      return res.status(429).json({
        is_success: false,
        official_email: OFFICIAL_EMAIL,
        data: null,
        error: 'AI service rate-limited. Please try again later or use a new API key.'
      });
    }

    return res.status(500).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL,
      data: null,
      error: 'Internal server error'
    });
  }
});

module.exports = router;
