export interface AnnualFigure {
  year: '2020-21' | '2021-22' | '2022-23';
  studentLoans: {
    plan1: {
      threshold: number;
      rate: number;
    };
    plan2: {
      threshold: number;
      rate: number;
    };
    plan4: {
      threshold: number;
      rate: number;
    };
  };
  postgraduateLoans: {
    england: {
      threshold: number;
      rate: number;
    };
    wales: {
      threshold: number;
      rate: number;
    };
    scotland: {
      threshold: number;
      rate: number;
    };
    northernIreland: {
      threshold: number;
      rate: number;
    };
  };
}

export const annualFigures: AnnualFigure[] = [
  {
    year: '2020-21',
    studentLoans: {
      plan1: {
        threshold: 19390,
        rate: 0.09,
      },
      plan2: {
        threshold: 26575,
        rate: 0.09,
      },
      plan4: {
        threshold: 0,
        rate: 0,
      },
    },
    postgraduateLoans: {
      england: {
        threshold: 21000,
        rate: 0.06,
      },
      wales: {
        threshold: 21000,
        rate: 0.06,
      },
      scotland: {
        threshold: 18330,
        rate: 0.09,
      },
      northernIreland: {
        threshold: 18330,
        rate: 0.09,
      },
    },
  },
  {
    year: '2021-22',
    studentLoans: {
      plan1: {
        threshold: 19895,
        rate: 0.09,
      },
      plan2: {
        threshold: 27295,
        rate: 0.09,
      },
      plan4: {
        threshold: 25000,
        rate: 0.09,
      },
    },
    postgraduateLoans: {
      england: {
        threshold: 21000,
        rate: 0.06,
      },
      wales: {
        threshold: 21000,
        rate: 0.06,
      },
      scotland: {
        threshold: 18330,
        rate: 0.09,
      },
      northernIreland: {
        threshold: 18330,
        rate: 0.09,
      },
    },
  },
  {
    year: '2022-23',
    studentLoans: {
      plan1: {
        threshold: 20195,
        rate: 0.09,
      },
      plan2: {
        threshold: 27295,
        rate: 0.09,
      },
      plan4: {
        threshold: 25375,
        rate: 0.09,
      },
    },
    postgraduateLoans: {
      england: {
        threshold: 21000,
        rate: 0.06,
      },
      wales: {
        threshold: 21000,
        rate: 0.06,
      },
      scotland: {
        threshold: 18330,
        rate: 0.09,
      },
      northernIreland: {
        threshold: 18330,
        rate: 0.09,
      },
    },
  },
];
